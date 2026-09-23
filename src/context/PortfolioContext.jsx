import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Bio as defaultBio,
  skills as defaultSkills,
  experiences as defaultExperiences,
  education as defaultEducation,
  projects as defaultProjects,
  publications as defaultPublications,
  TimeLineData as defaultTimeline,
} from "../data/constants";
import {
  initFirebase,
  subscribeToPortfolioDoc,
  savePortfolioToFirestore,
  saveAdminAuthToFirestore,
  fetchPortfolioFromFirestore,
} from "../firebase";

const PortfolioContext = createContext(null);

const SESSION_KEY = "portfolio_admin_session_v1";

export const PortfolioProvider = ({ children }) => {
  // Live state initialized with defaults from constants.js while fetching from database
  const [bio, setBioState] = useState(defaultBio);
  const [skills, setSkillsState] = useState(defaultSkills);
  const [experiences, setExperiencesState] = useState(defaultExperiences);
  const [education, setEducationState] = useState(defaultEducation);
  const [projects, setProjectsState] = useState(defaultProjects);
  const [publications, setPublicationsState] = useState(defaultPublications);
  const [timeline, setTimelineState] = useState(defaultTimeline);

  // Firestore connection status & loading state
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);
  const [isLoadingFromDatabase, setIsLoadingFromDatabase] = useState(true);

  // Admin authentication state (default lvlinh / lvlinh or from Firestore)
  const [adminAuth, setAdminAuthState] = useState({
    username: "lvlinh",
    password: "lvlinh",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  });

  // Apply cloud data to state
  const applyCloudData = (cloudData) => {
    if (!cloudData) return;
    if (cloudData.bio) setBioState(cloudData.bio);
    if (cloudData.skills) setSkillsState(cloudData.skills);
    if (cloudData.experiences) setExperiencesState(cloudData.experiences);
    if (cloudData.education) setEducationState(cloudData.education);
    if (cloudData.projects) setProjectsState(cloudData.projects);
    if (cloudData.publications) setPublicationsState(cloudData.publications);
    if (cloudData.timeline) setTimelineState(cloudData.timeline);
  };

  // Subscribe directly to Firestore database
  useEffect(() => {
    const { success } = initFirebase();
    setIsFirebaseConnected(success);

    if (success) {
      // First fetch: check if Firestore is empty -> if so, initialize with default data
      fetchPortfolioFromFirestore().then(async (cloudData) => {
        if (cloudData) {
          applyCloudData(cloudData);
        } else {
          // Initialize database with initial default data if brand new
          await savePortfolioToFirestore({
            bio: defaultBio,
            skills: defaultSkills,
            experiences: defaultExperiences,
            education: defaultEducation,
            projects: defaultProjects,
            publications: defaultPublications,
            timeline: defaultTimeline,
          });
        }
        setIsLoadingFromDatabase(false);
      });

      // Real-time snapshot listener from Firestore
      const unsubscribe = subscribeToPortfolioDoc(
        (cloudData) => {
          if (cloudData) {
            applyCloudData(cloudData);
          }
          setIsLoadingFromDatabase(false);
        },
        (authData) => {
          if (authData && authData.username && authData.password) {
            setAdminAuthState(authData);
          }
        }
      );

      return () => unsubscribe();
    } else {
      setIsLoadingFromDatabase(false);
    }
  }, []);

  // Update methods directly saving to Firestore Database
  const updateBio = async (newBio) => {
    setBioState(newBio);
    return await savePortfolioToFirestore({ bio: newBio });
  };

  const updateSkills = async (newSkills) => {
    setSkillsState(newSkills);
    return await savePortfolioToFirestore({ skills: newSkills });
  };

  const updateExperiences = async (newExperiences) => {
    setExperiencesState(newExperiences);
    return await savePortfolioToFirestore({ experiences: newExperiences });
  };

  const updateEducation = async (newEducation) => {
    setEducationState(newEducation);
    return await savePortfolioToFirestore({ education: newEducation });
  };

  const updateProjects = async (newProjects) => {
    setProjectsState(newProjects);
    return await savePortfolioToFirestore({ projects: newProjects });
  };

  const updatePublications = async (newPublications) => {
    setPublicationsState(newPublications);
    return await savePortfolioToFirestore({ publications: newPublications });
  };

  const updateTimeline = async (newTimeline) => {
    setTimelineState(newTimeline);
    return await savePortfolioToFirestore({ timeline: newTimeline });
  };

  // Sync current data directly to Firestore
  const syncToCloud = async () => {
    return await savePortfolioToFirestore({
      bio,
      skills,
      experiences,
      education,
      projects,
      publications,
      timeline,
    });
  };

  // Reset database back to constants.js default values
  const resetToDefaults = async () => {
    setBioState(defaultBio);
    setSkillsState(defaultSkills);
    setExperiencesState(defaultExperiences);
    setEducationState(defaultEducation);
    setProjectsState(defaultProjects);
    setPublicationsState(defaultPublications);
    setTimelineState(defaultTimeline);

    return await savePortfolioToFirestore({
      bio: defaultBio,
      skills: defaultSkills,
      experiences: defaultExperiences,
      education: defaultEducation,
      projects: defaultProjects,
      publications: defaultPublications,
      timeline: defaultTimeline,
    });
  };

  // Export JSON backup
  const exportAllData = () => {
    const data = {
      bio,
      skills,
      experiences,
      education,
      projects,
      publications,
      timeline,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `portfolio-backup-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON backup and save directly to Database
  const importAllData = async (importedData) => {
    applyCloudData(importedData);
    return await savePortfolioToFirestore(importedData);
  };

  // Auth methods
  const login = (username, password) => {
    if (
      username.trim().toLowerCase() === adminAuth.username.toLowerCase() &&
      password === adminAuth.password
    ) {
      setIsAuthenticated(true);
      sessionStorage.setItem(SESSION_KEY, "true");
      return { success: true };
    }
    return { success: false, error: "Sai tên đăng nhập hoặc mật khẩu!" };
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(SESSION_KEY);
  };

  const changeAdminCredentials = async (oldPassword, newUsername, newPassword) => {
    if (oldPassword !== adminAuth.password) {
      return { success: false, error: "Mật khẩu hiện tại không đúng!" };
    }
    if (!newUsername.trim() || !newPassword.trim()) {
      return { success: false, error: "Tên đăng nhập và mật khẩu không được để trống!" };
    }
    const newCredentials = {
      username: newUsername.trim(),
      password: newPassword.trim(),
    };
    setAdminAuthState(newCredentials);
    return await saveAdminAuthToFirestore(newCredentials);
  };

  return (
    <PortfolioContext.Provider
      value={{
        bio,
        skills,
        experiences,
        education,
        projects,
        publications,
        timeline,
        updateBio,
        updateSkills,
        updateExperiences,
        updateEducation,
        updateProjects,
        updatePublications,
        updateTimeline,
        resetToDefaults,
        exportAllData,
        importAllData,
        isAuthenticated,
        adminAuth,
        login,
        logout,
        changeAdminCredentials,
        isFirebaseConnected,
        isLoadingFromDatabase,
        syncToCloud,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolioData = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolioData must be used within a PortfolioProvider");
  }
  return context;
};
