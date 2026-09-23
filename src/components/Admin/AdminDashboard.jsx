import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePortfolioData } from "../../context/PortfolioContext";
import {
  AdminContainer,
  AdminSidebar,
  SidebarLogo,
  NavList,
  NavItem,
  SidebarFooter,
  AdminMain,
  TopHeader,
  HeaderTitle,
  HeaderActions,
  MobileMenuToggle,
  Card,
  CardHeader,
  FormGroup,
  FormRow,
  Input,
  TextArea,
  Button,
  ItemList,
  ItemCard,
  ItemInfo,
  ItemActions,
  TagList,
  Tag,
  ModalOverlay,
  ModalContent,
  ToastNotification,
} from "./AdminStyledComponents";

// Icons
import PersonIcon from "@mui/icons-material/Person";
import CodeIcon from "@mui/icons-material/Code";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import CloudSyncIcon from "@mui/icons-material/CloudSync";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import SyncIcon from "@mui/icons-material/Sync";

const AdminDashboard = () => {
  const {
    bio,
    skills,
    experiences,
    education,
    projects,
    publications,
    updateBio,
    updateSkills,
    updateExperiences,
    updateEducation,
    updateProjects,
    updatePublications,
    resetToDefaults,
    exportAllData,
    importAllData,
    logout,
    changeAdminCredentials,
    firebaseConfig,
    isFirebaseConnected,
    updateFirebaseConfig,
    syncToCloud,
  } = usePortfolioData();

  const [activeTab, setActiveTab] = useState("bio");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message: '' }
  const [isSyncing, setIsSyncing] = useState(false);

  // Firebase form state
  const [fbForm, setFbForm] = useState({
    apiKey: firebaseConfig?.apiKey || "",
    authDomain: firebaseConfig?.authDomain || "",
    projectId: firebaseConfig?.projectId || "",
    storageBucket: firebaseConfig?.storageBucket || "",
    messagingSenderId: firebaseConfig?.messagingSenderId || "",
    appId: firebaseConfig?.appId || "",
  });

  // Modals state
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null, // 'skillCategory' | 'skillItem' | 'experience' | 'education' | 'project' | 'publication'
    mode: "add", // 'add' | 'edit'
    data: null,
    parentId: null, // For sub-items like skill items
  });

  // Local form state for Bio tab
  const [bioForm, setBioForm] = useState({
    name: bio.name || "",
    roles: (bio.roles || []).join(", "),
    description: bio.description || "",
    resume: bio.resume || "",
    github: bio.github || "",
    linkedin: bio.linkedin || "",
    twitter: bio.twitter || "",
    insta: bio.insta || "",
    facebook: bio.facebook || "",
  });

  React.useEffect(() => {
    setBioForm({
      name: bio.name || "",
      roles: (bio.roles || []).join(", "),
      description: bio.description || "",
      resume: bio.resume || "",
      github: bio.github || "",
      linkedin: bio.linkedin || "",
      twitter: bio.twitter || "",
      insta: bio.insta || "",
      facebook: bio.facebook || "",
    });
  }, [bio]);

  // Settings tab form state
  const [pwForm, setPwForm] = useState({
    oldPassword: "",
    newUsername: "lvlinh",
    newPassword: "",
  });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Bio Save Handler
  const handleBioSave = (e) => {
    e.preventDefault();
    const updatedBio = {
      ...bioForm,
      roles: bioForm.roles.split(",").map((r) => r.trim()).filter(Boolean),
    };
    updateBio(updatedBio);
    showToast("Đã lưu thông tin cá nhân (Bio) thành công!");
  };

  // Password / Credentials change handler
  const handleCredentialsChange = (e) => {
    e.preventDefault();
    const res = changeAdminCredentials(
      pwForm.oldPassword,
      pwForm.newUsername,
      pwForm.newPassword
    );
    if (res.success) {
      showToast("Đã cập nhật thông tin đăng nhập thành công!");
      setPwForm({ oldPassword: "", newUsername: pwForm.newUsername, newPassword: "" });
    } else {
      showToast(res.error, "error");
    }
  };

  // Firebase Config Save handler
  const handleFirebaseSave = (e) => {
    e.preventDefault();
    const res = updateFirebaseConfig(fbForm);
    if (res.success) {
      showToast("Đã kết nối Firebase thành công!");
    } else {
      showToast(res.error || "Không thể kết nối Firebase!", "error");
    }
  };

  // Manual Sync to Cloud handler
  const handleManualCloudSync = async () => {
    setIsSyncing(true);
    const res = await syncToCloud();
    setIsSyncing(false);
    if (res.success) {
      showToast("Đã đồng bộ toàn bộ dữ liệu lên Firebase Firestore thành công!");
    } else {
      showToast(res.error || "Lỗi khi đồng bộ lên Firebase!", "error");
    }
  };

  // JSON Import handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        importAllData(parsed);
        showToast("Đã nhập dữ liệu từ file backup JSON thành công!");
      } catch (err) {
        showToast("File JSON không hợp lệ!", "error");
      }
    };
    reader.readAsText(file);
  };

  // Modal open helper
  const openModal = (type, mode = "add", data = null, parentId = null) => {
    setModalState({ isOpen: true, type, mode, data, parentId });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null, mode: "add", data: null, parentId: null });
  };

  return (
    <AdminContainer>
      {/* Toast Notification */}
      {toast && (
        <ToastNotification
          $type={toast.type}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          {toast.type === "error" ? <ErrorIcon /> : <CheckCircleIcon />}
          {toast.message}
        </ToastNotification>
      )}

      {/* Sidebar */}
      <AdminSidebar $isOpen={sidebarOpen}>
        <SidebarLogo>
          <h2>Portfolio CMS</h2>
          <span>Admin</span>
        </SidebarLogo>

        <NavList>
          <NavItem
            $active={activeTab === "bio"}
            onClick={() => {
              setActiveTab("bio");
              setSidebarOpen(false);
            }}
          >
            <PersonIcon /> Thông tin & Mạng xã hội
          </NavItem>

          <NavItem
            $active={activeTab === "skills"}
            onClick={() => {
              setActiveTab("skills");
              setSidebarOpen(false);
            }}
          >
            <CodeIcon /> Kỹ năng (Skills)
          </NavItem>

          <NavItem
            $active={activeTab === "experience"}
            onClick={() => {
              setActiveTab("experience");
              setSidebarOpen(false);
            }}
          >
            <WorkIcon /> Kinh nghiệm (Experience)
          </NavItem>

          <NavItem
            $active={activeTab === "education"}
            onClick={() => {
              setActiveTab("education");
              setSidebarOpen(false);
            }}
          >
            <SchoolIcon /> Học vấn (Education)
          </NavItem>

          <NavItem
            $active={activeTab === "projects"}
            onClick={() => {
              setActiveTab("projects");
              setSidebarOpen(false);
            }}
          >
            <RocketLaunchIcon /> Dự án (Projects)
          </NavItem>

          <NavItem
            $active={activeTab === "publications"}
            onClick={() => {
              setActiveTab("publications");
              setSidebarOpen(false);
            }}
          >
            <MenuBookIcon /> Công trình (Publications)
          </NavItem>

          <NavItem
            $active={activeTab === "settings"}
            onClick={() => {
              setActiveTab("settings");
              setSidebarOpen(false);
            }}
          >
            <SettingsIcon /> Cài đặt & Sao lưu
          </NavItem>
        </NavList>

        <SidebarFooter>
          <Button as={Link} to="/" $variant="secondary" style={{ width: "100%" }}>
            <VisibilityIcon /> Xem Portfolio
          </Button>
          <Button $variant="danger" onClick={logout} style={{ width: "100%" }}>
            <LogoutIcon /> Đăng xuất
          </Button>
        </SidebarFooter>
      </AdminSidebar>

      {/* Main Panel */}
      <AdminMain>
        <TopHeader>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <MobileMenuToggle onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </MobileMenuToggle>
            <HeaderTitle>
              <h1>
                {activeTab === "bio" && "Thông tin cá nhân & Mạng xã hội"}
                {activeTab === "skills" && "Quản lý Kỹ năng (Skills)"}
                {activeTab === "experience" && "Quản lý Kinh nghiệm (Experience)"}
                {activeTab === "education" && "Quản lý Học vấn (Education)"}
                {activeTab === "projects" && "Quản lý Dự án (Projects)"}
                {activeTab === "publications" && "Quản lý Công trình (Publications)"}
                {activeTab === "settings" && "Cài đặt & Quản lý dữ liệu"}
              </h1>
              <p>Chỉnh sửa các thông tin sẽ hiển thị tức thì trên giao diện Portfolio</p>
            </HeaderTitle>
          </div>

          <HeaderActions>
            <Button as={Link} to="/" $variant="secondary" $size="small">
              <VisibilityIcon style={{ fontSize: 16 }} /> Xem trang chủ
            </Button>
          </HeaderActions>
        </TopHeader>

        {/* TAB: BIO & SOCIALS */}
        {activeTab === "bio" && (
          <Card initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <CardHeader>
              <h3>
                <PersonIcon /> Hồ sơ cá nhân (Hero & Bio)
              </h3>
            </CardHeader>
            <form onSubmit={handleBioSave}>
              <FormRow>
                <FormGroup>
                  <label>Họ và tên *</label>
                  <Input
                    type="text"
                    value={bioForm.name}
                    onChange={(e) => setBioForm({ ...bioForm, name: e.target.value })}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>Các vai trò (Phân cách bởi dấu phẩy) *</label>
                  <Input
                    type="text"
                    value={bioForm.roles}
                    placeholder="Full-Stack Developer, AI Researcher, Web Developer"
                    onChange={(e) => setBioForm({ ...bioForm, roles: e.target.value })}
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <label>Mô tả giới thiệu bản thân (Bio Description) *</label>
                <TextArea
                  rows={4}
                  value={bioForm.description}
                  onChange={(e) => setBioForm({ ...bioForm, description: e.target.value })}
                  required
                />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <label>Link CV / Resume (Google Drive, v.v.)</label>
                  <Input
                    type="text"
                    value={bioForm.resume}
                    placeholder="https://drive.google.com/..."
                    onChange={(e) => setBioForm({ ...bioForm, resume: e.target.value })}
                  />
                </FormGroup>

                <FormGroup>
                  <label>GitHub URL</label>
                  <Input
                    type="text"
                    value={bioForm.github}
                    placeholder="https://github.com/..."
                    onChange={(e) => setBioForm({ ...bioForm, github: e.target.value })}
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <label>LinkedIn URL</label>
                  <Input
                    type="text"
                    value={bioForm.linkedin}
                    placeholder="https://linkedin.com/in/..."
                    onChange={(e) => setBioForm({ ...bioForm, linkedin: e.target.value })}
                  />
                </FormGroup>

                <FormGroup>
                  <label>Twitter / X URL</label>
                  <Input
                    type="text"
                    value={bioForm.twitter}
                    placeholder="https://x.com/..."
                    onChange={(e) => setBioForm({ ...bioForm, twitter: e.target.value })}
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <label>Instagram URL</label>
                  <Input
                    type="text"
                    value={bioForm.insta}
                    placeholder="https://instagram.com/..."
                    onChange={(e) => setBioForm({ ...bioForm, insta: e.target.value })}
                  />
                </FormGroup>

                <FormGroup>
                  <label>Facebook URL</label>
                  <Input
                    type="text"
                    value={bioForm.facebook}
                    placeholder="https://facebook.com/..."
                    onChange={(e) => setBioForm({ ...bioForm, facebook: e.target.value })}
                  />
                </FormGroup>
              </FormRow>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                <Button type="submit">
                  <SaveIcon /> Lưu thay đổi Bio
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* TAB: SKILLS */}
        {activeTab === "skills" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, color: "#fff", margin: 0 }}>Danh mục kỹ năng ({skills.length})</h2>
              <Button onClick={() => openModal("skillCategory", "add")}>
                <AddIcon /> Thêm nhóm kỹ năng
              </Button>
            </div>

            {skills.map((category, catIndex) => (
              <Card key={catIndex} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
                <CardHeader>
                  <h3>{category.title} ({category.skills ? category.skills.length : 0})</h3>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Button
                      $size="small"
                      $variant="secondary"
                      onClick={() => openModal("skillCategory", "edit", { ...category, index: catIndex })}
                    >
                      <EditIcon style={{ fontSize: 14 }} /> Sửa tên nhóm
                    </Button>
                    <Button
                      $size="small"
                      $variant="secondary"
                      onClick={() => openModal("skillItem", "add", null, catIndex)}
                    >
                      <AddIcon style={{ fontSize: 14 }} /> Thêm kỹ năng vào nhóm
                    </Button>
                    <Button
                      $size="small"
                      $variant="danger"
                      onClick={() => {
                        if (window.confirm(`Bạn có chắc muốn xoá nhóm "${category.title}"?`)) {
                          const updated = skills.filter((_, i) => i !== catIndex);
                          updateSkills(updated);
                          showToast(`Đã xoá nhóm "${category.title}"`);
                        }
                      }}
                    >
                      <DeleteIcon style={{ fontSize: 14 }} /> Xoá nhóm
                    </Button>
                  </div>
                </CardHeader>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {(category.skills || []).map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      style={{
                        background: "rgba(11, 12, 22, 0.8)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 10,
                        padding: "8px 14px",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      {skill.image && (
                        <img
                          src={skill.image}
                          alt={skill.name}
                          style={{ width: 20, height: 20, objectFit: "contain" }}
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      )}
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{skill.name}</span>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          color: "rgba(255,255,255,0.4)",
                          cursor: "pointer",
                          padding: 0,
                        }}
                        onClick={() => openModal("skillItem", "edit", { ...skill, itemIndex: sIdx }, catIndex)}
                        title="Sửa kỹ năng"
                      >
                        <EditIcon style={{ fontSize: 14 }} />
                      </button>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          color: "#ff6b6b",
                          cursor: "pointer",
                          padding: 0,
                        }}
                        onClick={() => {
                          const newSkills = [...skills];
                          newSkills[catIndex].skills = newSkills[catIndex].skills.filter((_, i) => i !== sIdx);
                          updateSkills(newSkills);
                          showToast(`Đã xoá kỹ năng ${skill.name}`);
                        }}
                        title="Xoá kỹ năng"
                      >
                        <CloseIcon style={{ fontSize: 14 }} />
                      </button>
                    </div>
                  ))}
                  {(!category.skills || category.skills.length === 0) && (
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Chưa có kỹ năng nào trong nhóm này.</p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* TAB: EXPERIENCE */}
        {activeTab === "experience" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, color: "#fff", margin: 0 }}>Danh sách kinh nghiệm làm việc ({experiences.length})</h2>
              <Button onClick={() => openModal("experience", "add")}>
                <AddIcon /> Thêm kinh nghiệm
              </Button>
            </div>

            <ItemList>
              {experiences.map((exp, index) => (
                <ItemCard key={index}>
                  <ItemInfo>
                    <h4>{exp.company}</h4>
                    <div className="sub">{exp.role}</div>
                    <div className="date">{exp.date}</div>
                    {exp.desc && <div className="desc">{exp.desc}</div>}
                    {exp.skills && exp.skills.length > 0 && (
                      <TagList>
                        {exp.skills.map((s, i) => (
                          <Tag key={i}>{s}</Tag>
                        ))}
                      </TagList>
                    )}
                  </ItemInfo>
                  <ItemActions>
                    <Button
                      $size="small"
                      $variant="secondary"
                      onClick={() => openModal("experience", "edit", { ...exp, index })}
                    >
                      <EditIcon style={{ fontSize: 14 }} /> Sửa
                    </Button>
                    <Button
                      $size="small"
                      $variant="danger"
                      onClick={() => {
                        if (window.confirm(`Xoá kinh nghiệm tại "${exp.company}"?`)) {
                          const updated = experiences.filter((_, i) => i !== index);
                          updateExperiences(updated);
                          showToast(`Đã xoá kinh nghiệm tại ${exp.company}`);
                        }
                      }}
                    >
                      <DeleteIcon style={{ fontSize: 14 }} /> Xoá
                    </Button>
                  </ItemActions>
                </ItemCard>
              ))}
            </ItemList>
          </div>
        )}

        {/* TAB: EDUCATION */}
        {activeTab === "education" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, color: "#fff", margin: 0 }}>Danh sách quá trình học vấn ({education.length})</h2>
              <Button onClick={() => openModal("education", "add")}>
                <AddIcon /> Thêm học vấn
              </Button>
            </div>

            <ItemList>
              {education.map((edu, index) => (
                <ItemCard key={index}>
                  <ItemInfo>
                    <h4>{edu.school}</h4>
                    <div className="sub">{edu.degree}</div>
                    <div className="date">{edu.date} {edu.fieldOfStudy ? `• ${edu.fieldOfStudy}` : ""}</div>
                    {edu.thesis && (
                      <div className="desc" style={{ fontStyle: "italic" }}>
                        Luận văn / Đề tài: {edu.thesis}
                      </div>
                    )}
                  </ItemInfo>
                  <ItemActions>
                    <Button
                      $size="small"
                      $variant="secondary"
                      onClick={() => openModal("education", "edit", { ...edu, index })}
                    >
                      <EditIcon style={{ fontSize: 14 }} /> Sửa
                    </Button>
                    <Button
                      $size="small"
                      $variant="danger"
                      onClick={() => {
                        if (window.confirm(`Xoá học vấn tại "${edu.school}"?`)) {
                          const updated = education.filter((_, i) => i !== index);
                          updateEducation(updated);
                          showToast(`Đã xoá học vấn tại ${edu.school}`);
                        }
                      }}
                    >
                      <DeleteIcon style={{ fontSize: 14 }} /> Xoá
                    </Button>
                  </ItemActions>
                </ItemCard>
              ))}
            </ItemList>
          </div>
        )}

        {/* TAB: PROJECTS */}
        {activeTab === "projects" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, color: "#fff", margin: 0 }}>Danh sách dự án ({projects.length})</h2>
              <Button onClick={() => openModal("project", "add")}>
                <AddIcon /> Thêm dự án mới
              </Button>
            </div>

            <ItemList>
              {projects.map((proj, index) => (
                <ItemCard key={index}>
                  <ItemInfo>
                    <h4>{proj.title}</h4>
                    <div className="date">{proj.date} {proj.category ? `• [${proj.category}]` : ""}</div>
                    <div className="desc">{proj.description}</div>
                    {proj.tags && proj.tags.length > 0 && (
                      <TagList>
                        {proj.tags.map((t, i) => (
                          <Tag key={i}>{t}</Tag>
                        ))}
                      </TagList>
                    )}
                    <div style={{ marginTop: 10, display: "flex", gap: 12, fontSize: 12 }}>
                      {proj.github && (
                        <a href={proj.github} target="_blank" rel="noreferrer" style={{ color: "#306ee8" }}>
                          GitHub Link ↗
                        </a>
                      )}
                      {proj.webapp && (
                        <a href={proj.webapp} target="_blank" rel="noreferrer" style={{ color: "#854ce6" }}>
                          Live Demo ↗
                        </a>
                      )}
                    </div>
                  </ItemInfo>
                  <ItemActions>
                    <Button
                      $size="small"
                      $variant="secondary"
                      onClick={() => openModal("project", "edit", { ...proj, index })}
                    >
                      <EditIcon style={{ fontSize: 14 }} /> Sửa
                    </Button>
                    <Button
                      $size="small"
                      $variant="danger"
                      onClick={() => {
                        if (window.confirm(`Xoá dự án "${proj.title}"?`)) {
                          const updated = projects.filter((_, i) => i !== index);
                          updateProjects(updated);
                          showToast(`Đã xoá dự án ${proj.title}`);
                        }
                      }}
                    >
                      <DeleteIcon style={{ fontSize: 14 }} /> Xoá
                    </Button>
                  </ItemActions>
                </ItemCard>
              ))}
            </ItemList>
          </div>
        )}

        {/* TAB: PUBLICATIONS */}
        {activeTab === "publications" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, color: "#fff", margin: 0 }}>Danh sách công trình nghiên cứu ({publications.length})</h2>
              <Button onClick={() => openModal("publication", "add")}>
                <AddIcon /> Thêm công trình
              </Button>
            </div>

            <ItemList>
              {publications.map((pub, index) => (
                <ItemCard key={index}>
                  <ItemInfo>
                    <h4>{pub.title}</h4>
                    {pub.translatedTitle && (
                      <div className="sub" style={{ fontStyle: "italic" }}>
                        {pub.translatedTitle}
                      </div>
                    )}
                    <div className="date">{pub.date} {pub.type ? `• ${pub.type}` : ""}</div>
                    <div className="desc">
                      {pub.conference && <div><strong>Hội nghị:</strong> {pub.conference}</div>}
                      {pub.role && <div><strong>Vai trò:</strong> {pub.role}</div>}
                      {pub.contributors && <div><strong>Tác giả:</strong> {pub.contributors}</div>}
                      {pub.doi && <div><strong>DOI:</strong> {pub.doi}</div>}
                      {pub.isbn && <div><strong>ISBN:</strong> {pub.isbn}</div>}
                    </div>
                    {pub.url && (
                      <div style={{ marginTop: 8, fontSize: 12 }}>
                        <a href={pub.url} target="_blank" rel="noreferrer" style={{ color: "#854ce6" }}>
                          Xem bài viết ↗
                        </a>
                      </div>
                    )}
                  </ItemInfo>
                  <ItemActions>
                    <Button
                      $size="small"
                      $variant="secondary"
                      onClick={() => openModal("publication", "edit", { ...pub, index })}
                    >
                      <EditIcon style={{ fontSize: 14 }} /> Sửa
                    </Button>
                    <Button
                      $size="small"
                      $variant="danger"
                      onClick={() => {
                        if (window.confirm(`Xoá công trình "${pub.title}"?`)) {
                          const updated = publications.filter((_, i) => i !== index);
                          updatePublications(updated);
                          showToast(`Đã xoá công trình nghiên cứu!`);
                        }
                      }}
                    >
                      <DeleteIcon style={{ fontSize: 14 }} /> Xoá
                    </Button>
                  </ItemActions>
                </ItemCard>
              ))}
            </ItemList>
          </div>
        )}

        {/* TAB: SETTINGS & BACKUP */}
        {activeTab === "settings" && (
          <div>
            {/* Firebase Cloud Database Config */}
            <Card initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
              <CardHeader>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <h3>
                    <CloudSyncIcon /> Đồng bộ Firebase Cloud Database
                  </h3>
                  {isFirebaseConnected ? (
                    <span
                      style={{
                        background: "rgba(46, 125, 50, 0.2)",
                        color: "#4caf50",
                        border: "1px solid rgba(76, 175, 80, 0.4)",
                        fontSize: "12px",
                        fontWeight: 600,
                        padding: "2px 10px",
                        borderRadius: "12px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <CloudDoneIcon style={{ fontSize: 14 }} /> Đã kết nối Firestore
                    </span>
                  ) : (
                    <span
                      style={{
                        background: "rgba(255, 193, 7, 0.15)",
                        color: "#ffc107",
                        border: "1px solid rgba(255, 193, 7, 0.3)",
                        fontSize: "12px",
                        fontWeight: 600,
                        padding: "2px 10px",
                        borderRadius: "12px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <CloudOffIcon style={{ fontSize: 14 }} /> Đang dùng LocalStorage
                    </span>
                  )}
                </div>

                {isFirebaseConnected && (
                  <Button
                    $variant="success"
                    $size="small"
                    onClick={handleManualCloudSync}
                    disabled={isSyncing}
                  >
                    <SyncIcon style={{ fontSize: 14 }} /> {isSyncing ? "Đang đẩy lên Cloud..." : "Đồng bộ dữ liệu lên Cloud"}
                  </Button>
                )}
              </CardHeader>

              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", marginTop: 0, marginBottom: 16 }}>
                Khi kết nối với Firebase Firestore, bất kỳ khi nào bạn sửa thông tin ở Admin, tất cả người xem trên toàn thế giới đều sẽ nhìn thấy dữ liệu mới ngay tức thì (Real-time).
              </p>

              <form onSubmit={handleFirebaseSave}>
                <FormRow>
                  <FormGroup>
                    <label>API Key *</label>
                    <Input
                      type="text"
                      placeholder="AIzaSy..."
                      value={fbForm.apiKey}
                      onChange={(e) => setFbForm({ ...fbForm, apiKey: e.target.value })}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <label>Project ID *</label>
                    <Input
                      type="text"
                      placeholder="my-portfolio-123"
                      value={fbForm.projectId}
                      onChange={(e) => setFbForm({ ...fbForm, projectId: e.target.value })}
                      required
                    />
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <label>Auth Domain</label>
                    <Input
                      type="text"
                      placeholder="my-portfolio-123.firebaseapp.com"
                      value={fbForm.authDomain}
                      onChange={(e) => setFbForm({ ...fbForm, authDomain: e.target.value })}
                    />
                  </FormGroup>

                  <FormGroup>
                    <label>Storage Bucket</label>
                    <Input
                      type="text"
                      placeholder="my-portfolio-123.appspot.com"
                      value={fbForm.storageBucket}
                      onChange={(e) => setFbForm({ ...fbForm, storageBucket: e.target.value })}
                    />
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <label>Messaging Sender ID</label>
                    <Input
                      type="text"
                      placeholder="123456789"
                      value={fbForm.messagingSenderId}
                      onChange={(e) => setFbForm({ ...fbForm, messagingSenderId: e.target.value })}
                    />
                  </FormGroup>

                  <FormGroup>
                    <label>App ID</label>
                    <Input
                      type="text"
                      placeholder="1:123456789:web:abcdef..."
                      value={fbForm.appId}
                      onChange={(e) => setFbForm({ ...fbForm, appId: e.target.value })}
                    />
                  </FormGroup>
                </FormRow>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 12 }}>
                  <Button type="submit">
                    <SaveIcon /> Lưu cấu hình & Kết nối Firebase
                  </Button>
                </div>
              </form>

              <div
                style={{
                  marginTop: 18,
                  padding: 14,
                  background: "rgba(133, 76, 230, 0.08)",
                  borderRadius: 10,
                  border: "1px dashed rgba(133, 76, 230, 0.3)",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                <strong style={{ color: "#a77df8" }}>💡 Cách lấy thông tin Firebase miễn phí trong 1 phút:</strong>
                <ol style={{ margin: "6px 0 0 18px", padding: 0 }}>
                  <li>Truy cập <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer" style={{ color: "#306ee8" }}>console.firebase.google.com</a> tạo 1 Project mới.</li>
                  <li>Vào <strong>Build &gt; Firestore Database</strong> &gt; Tạo Database (chọn chế độ <strong>Test mode</strong> để có quyền đọc/ghi).</li>
                  <li>Vào <strong>Project settings &gt; General &gt; Your apps &gt; Web (icon &lt;/&gt;)</strong> và sao chép các thông số dán vào form trên rồi bấm Lưu!</li>
                </ol>
              </div>
            </Card>

            {/* Password change */}
            <Card initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
              <CardHeader>
                <h3>
                  <SettingsIcon /> Đổi thông tin đăng nhập Admin
                </h3>
              </CardHeader>
              <form onSubmit={handleCredentialsChange}>
                <FormRow>
                  <FormGroup>
                    <label>Mật khẩu hiện tại *</label>
                    <Input
                      type="password"
                      placeholder="Mật khẩu cũ"
                      value={pwForm.oldPassword}
                      onChange={(e) => setPwForm({ ...pwForm, oldPassword: e.target.value })}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <label>Tên đăng nhập mới *</label>
                    <Input
                      type="text"
                      placeholder="admin"
                      value={pwForm.newUsername}
                      onChange={(e) => setPwForm({ ...pwForm, newUsername: e.target.value })}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <label>Mật khẩu mới *</label>
                    <Input
                      type="password"
                      placeholder="Mật khẩu mới"
                      value={pwForm.newPassword}
                      onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })}
                      required
                    />
                  </FormGroup>
                </FormRow>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
                  <Button type="submit">
                    <SaveIcon /> Lưu mật khẩu mới
                  </Button>
                </div>
              </form>
            </Card>

            {/* Backup & Restore */}
            <Card initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
              <CardHeader>
                <h3>
                  <DownloadIcon /> Sao lưu & Khôi phục dữ liệu
                </h3>
              </CardHeader>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <h4 style={{ color: "#fff", margin: "0 0 6px 0", fontSize: 15 }}>
                    Xuất file JSON sao lưu (Export Backup)
                  </h4>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, margin: "0 0 12px 0" }}>
                    Tải về toàn bộ thông tin portfolio (Bio, Skills, Projects, v.v.) thành file JSON để lưu trữ hoặc chuyển sang máy khác.
                  </p>
                  <Button onClick={exportAllData}>
                    <DownloadIcon /> Xuất file Backup JSON
                  </Button>
                </div>

                <hr style={{ borderColor: "rgba(255,255,255,0.08)", margin: "10px 0" }} />

                <div>
                  <h4 style={{ color: "#fff", margin: "0 0 6px 0", fontSize: 15 }}>
                    Nhập file JSON sao lưu (Import Backup)
                  </h4>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, margin: "0 0 12px 0" }}>
                    Tải lên file JSON đã sao lưu trước đó để khôi phục lại dữ liệu.
                  </p>
                  <label>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      style={{ display: "none" }}
                    />
                    <Button as="span" $variant="secondary" style={{ cursor: "pointer" }}>
                      <UploadIcon /> Chọn file JSON để nhập
                    </Button>
                  </label>
                </div>

                <hr style={{ borderColor: "rgba(255,255,255,0.08)", margin: "10px 0" }} />

                <div>
                  <h4 style={{ color: "#ff6b6b", margin: "0 0 6px 0", fontSize: 15 }}>
                    Khôi phục dữ liệu gốc mặc định (Reset to Defaults)
                  </h4>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, margin: "0 0 12px 0" }}>
                    Đặt lại toàn bộ nội dung Portfolio về các giá trị ban đầu từ mã nguồn constants.js.
                  </p>
                  <Button
                    $variant="danger"
                    onClick={() => {
                      if (window.confirm("Bạn có chắc chắn muốn khôi phục toàn bộ dữ liệu về mặc định ban đầu?")) {
                        resetToDefaults();
                        showToast("Đã khôi phục toàn bộ dữ liệu về mặc định!");
                        // update local form
                        setBioForm({
                          name: bio.name || "",
                          roles: (bio.roles || []).join(", "),
                          description: bio.description || "",
                          resume: bio.resume || "",
                          github: bio.github || "",
                          linkedin: bio.linkedin || "",
                          twitter: bio.twitter || "",
                          insta: bio.insta || "",
                          facebook: bio.facebook || "",
                        });
                      }
                    }}
                  >
                    <RestartAltIcon /> Khôi phục về mặc định ban đầu
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </AdminMain>

      {/* MODAL DIALOG FOR CRUD ITEMS */}
      {modalState.isOpen && (
        <GenericItemModal
          modalState={modalState}
          closeModal={closeModal}
          skills={skills}
          updateSkills={updateSkills}
          experiences={experiences}
          updateExperiences={updateExperiences}
          education={education}
          updateEducation={updateEducation}
          projects={projects}
          updateProjects={updateProjects}
          publications={publications}
          updatePublications={updatePublications}
          showToast={showToast}
        />
      )}
    </AdminContainer>
  );
};

// Generic Modal Component to handle add/edit for all data types
const GenericItemModal = ({
  modalState,
  closeModal,
  skills,
  updateSkills,
  experiences,
  updateExperiences,
  education,
  updateEducation,
  projects,
  updateProjects,
  publications,
  updatePublications,
  showToast,
}) => {
  const { type, mode, data, parentId } = modalState;

  // Form states based on type
  const [catTitle, setCatTitle] = useState(data ? data.title || "" : "");
  const [skillForm, setSkillForm] = useState({
    name: data ? data.name || "" : "",
    image: data ? data.image || "" : "",
  });
  const [expForm, setExpForm] = useState({
    company: data ? data.company || "" : "",
    role: data ? data.role || "" : "",
    date: data ? data.date || "" : "",
    desc: data ? data.desc || "" : "",
    skills: data ? (data.skills || []).join(", ") : "",
  });
  const [eduForm, setEduForm] = useState({
    school: data ? data.school || "" : "",
    degree: data ? data.degree || "" : "",
    fieldOfStudy: data ? data.fieldOfStudy || "" : "",
    date: data ? data.date || "" : "",
    thesis: data ? data.thesis || "" : "",
  });
  const [projForm, setProjForm] = useState({
    title: data ? data.title || "" : "",
    date: data ? data.date || "" : "",
    category: data ? data.category || "web app" : "web app",
    description: data ? data.description || "" : "",
    tags: data ? (data.tags || []).join(", ") : "",
    github: data ? data.github || "" : "",
    webapp: data ? data.webapp || "" : "",
  });
  const [pubForm, setPubForm] = useState({
    title: data ? data.title || "" : "",
    translatedTitle: data ? data.translatedTitle || "" : "",
    conference: data ? data.conference || "" : "",
    date: data ? data.date || "" : "",
    type: data ? data.type || "Conference paper" : "Conference paper",
    role: data ? data.role || "" : "",
    isbn: data ? data.isbn || "" : "",
    doi: data ? data.doi || "" : "",
    contributors: data ? data.contributors || "" : "",
    url: data ? data.url || "" : "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "skillCategory") {
      if (mode === "add") {
        updateSkills([...skills, { title: catTitle, skills: [] }]);
        showToast(`Đã thêm nhóm kỹ năng "${catTitle}"`);
      } else {
        const updated = [...skills];
        updated[data.index].title = catTitle;
        updateSkills(updated);
        showToast("Đã cập nhật nhóm kỹ năng!");
      }
    } else if (type === "skillItem") {
      const updated = [...skills];
      if (mode === "add") {
        if (!updated[parentId].skills) updated[parentId].skills = [];
        updated[parentId].skills.push({ ...skillForm });
        showToast(`Đã thêm kỹ năng "${skillForm.name}"`);
      } else {
        updated[parentId].skills[data.itemIndex] = { ...skillForm };
        showToast(`Đã cập nhật kỹ năng "${skillForm.name}"`);
      }
      updateSkills(updated);
    } else if (type === "experience") {
      const formattedExp = {
        ...expForm,
        skills: expForm.skills.split(",").map((s) => s.trim()).filter(Boolean),
      };
      if (mode === "add") {
        updateExperiences([{ ...formattedExp, id: Date.now() }, ...experiences]);
        showToast(`Đã thêm kinh nghiệm tại "${formattedExp.company}"`);
      } else {
        const updated = [...experiences];
        updated[data.index] = { ...updated[data.index], ...formattedExp };
        updateExperiences(updated);
        showToast(`Đã cập nhật kinh nghiệm!`);
      }
    } else if (type === "education") {
      if (mode === "add") {
        updateEducation([{ ...eduForm, id: Date.now() }, ...education]);
        showToast(`Đã thêm học vấn "${eduForm.school}"`);
      } else {
        const updated = [...education];
        updated[data.index] = { ...updated[data.index], ...eduForm };
        updateEducation(updated);
        showToast("Đã cập nhật học vấn!");
      }
    } else if (type === "project") {
      const formattedProj = {
        ...projForm,
        tags: projForm.tags.split(",").map((t) => t.trim()).filter(Boolean),
      };
      if (mode === "add") {
        updateProjects([{ ...formattedProj, id: Date.now() }, ...projects]);
        showToast(`Đã thêm dự án "${formattedProj.title}"`);
      } else {
        const updated = [...projects];
        updated[data.index] = { ...updated[data.index], ...formattedProj };
        updateProjects(updated);
        showToast("Đã cập nhật dự án!");
      }
    } else if (type === "publication") {
      if (mode === "add") {
        updatePublications([{ ...pubForm, id: Date.now() }, ...publications]);
        showToast("Đã thêm công trình nghiên cứu!");
      } else {
        const updated = [...publications];
        updated[data.index] = { ...updated[data.index], ...pubForm };
        updatePublications(updated);
        showToast("Đã cập nhật công trình nghiên cứu!");
      }
    }

    closeModal();
  };

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <CardHeader>
          <h3>
            {mode === "add" ? "Thêm mới" : "Chỉnh sửa"}{" "}
            {type === "skillCategory" && "Nhóm kỹ năng"}
            {type === "skillItem" && "Kỹ năng"}
            {type === "experience" && "Kinh nghiệm làm việc"}
            {type === "education" && "Quá trình học vấn"}
            {type === "project" && "Dự án"}
            {type === "publication" && "Công trình nghiên cứu"}
          </h3>
          <button
            onClick={closeModal}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.6)",
              cursor: "pointer",
            }}
          >
            <CloseIcon />
          </button>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          {type === "skillCategory" && (
            <FormGroup>
              <label>Tên nhóm kỹ năng (Frontend, Backend, Database, Others, v.v.) *</label>
              <Input
                type="text"
                value={catTitle}
                onChange={(e) => setCatTitle(e.target.value)}
                required
                autoFocus
              />
            </FormGroup>
          )}

          {type === "skillItem" && (
            <>
              <FormGroup>
                <label>Tên kỹ năng (ReactJS, Python, Docker, v.v.) *</label>
                <Input
                  type="text"
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  required
                  autoFocus
                />
              </FormGroup>
              <FormGroup>
                <label>Icon / Image URL hoặc SVG data</label>
                <Input
                  type="text"
                  placeholder="https://... hoặc data:image/svg+xml..."
                  value={skillForm.image}
                  onChange={(e) => setSkillForm({ ...skillForm, image: e.target.value })}
                />
              </FormGroup>
            </>
          )}

          {type === "experience" && (
            <>
              <FormRow>
                <FormGroup>
                  <label>Công ty / Tổ chức *</label>
                  <Input
                    type="text"
                    value={expForm.company}
                    onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Vị trí / Vai trò *</label>
                  <Input
                    type="text"
                    value={expForm.role}
                    onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                    required
                  />
                </FormGroup>
              </FormRow>
              <FormGroup>
                <label>Thời gian (Ví dụ: Aug 2025 - Present) *</label>
                <Input
                  type="text"
                  value={expForm.date}
                  onChange={(e) => setExpForm({ ...expForm, date: e.target.value })}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Mô tả công việc</label>
                <TextArea
                  rows={3}
                  value={expForm.desc}
                  onChange={(e) => setExpForm({ ...expForm, desc: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <label>Kỹ năng sử dụng (Phân cách bởi dấu phẩy)</label>
                <Input
                  type="text"
                  placeholder="PHP, Laravel, MySQL, Docker"
                  value={expForm.skills}
                  onChange={(e) => setExpForm({ ...expForm, skills: e.target.value })}
                />
              </FormGroup>
            </>
          )}

          {type === "education" && (
            <>
              <FormGroup>
                <label>Trường / Cơ sở đào tạo *</label>
                <Input
                  type="text"
                  value={eduForm.school}
                  onChange={(e) => setEduForm({ ...eduForm, school: e.target.value })}
                  required
                />
              </FormGroup>
              <FormRow>
                <FormGroup>
                  <label>Bằng cấp / Trình độ *</label>
                  <Input
                    type="text"
                    placeholder="M.Sc. in Computer Science"
                    value={eduForm.degree}
                    onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Chuyên ngành (Field of Study)</label>
                  <Input
                    type="text"
                    placeholder="Computer Science"
                    value={eduForm.fieldOfStudy}
                    onChange={(e) => setEduForm({ ...eduForm, fieldOfStudy: e.target.value })}
                  />
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <label>Thời gian học *</label>
                  <Input
                    type="text"
                    placeholder="2025 - Present"
                    value={eduForm.date}
                    onChange={(e) => setEduForm({ ...eduForm, date: e.target.value })}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Đề tài luận văn / Điểm (Nếu có)</label>
                  <Input
                    type="text"
                    placeholder="(In Progress)"
                    value={eduForm.thesis}
                    onChange={(e) => setEduForm({ ...eduForm, thesis: e.target.value })}
                  />
                </FormGroup>
              </FormRow>
            </>
          )}

          {type === "project" && (
            <>
              <FormRow>
                <FormGroup>
                  <label>Tên dự án *</label>
                  <Input
                    type="text"
                    value={projForm.title}
                    onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Thời gian (Ví dụ: May 2026 - Jun 2026) *</label>
                  <Input
                    type="text"
                    value={projForm.date}
                    onChange={(e) => setProjForm({ ...projForm, date: e.target.value })}
                    required
                  />
                </FormGroup>
              </FormRow>
              <FormGroup>
                <label>Thể loại dự án (Category)</label>
                <Input
                  type="text"
                  placeholder="web app, mobile app, ai model..."
                  value={projForm.category}
                  onChange={(e) => setProjForm({ ...projForm, category: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <label>Mô tả chi tiết dự án *</label>
                <TextArea
                  rows={4}
                  value={projForm.description}
                  onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Tags công nghệ (Phân cách bởi dấu phẩy)</label>
                <Input
                  type="text"
                  placeholder="ReactJS, NodeJS, MongoDB, Tailwind CSS"
                  value={projForm.tags}
                  onChange={(e) => setProjForm({ ...projForm, tags: e.target.value })}
                />
              </FormGroup>
              <FormRow>
                <FormGroup>
                  <label>GitHub Repository URL</label>
                  <Input
                    type="text"
                    placeholder="https://github.com/..."
                    value={projForm.github}
                    onChange={(e) => setProjForm({ ...projForm, github: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Live WebApp URL</label>
                  <Input
                    type="text"
                    placeholder="https://..."
                    value={projForm.webapp}
                    onChange={(e) => setProjForm({ ...projForm, webapp: e.target.value })}
                  />
                </FormGroup>
              </FormRow>
            </>
          )}

          {type === "publication" && (
            <>
              <FormGroup>
                <label>Tiêu đề bài báo / Công trình (Tiếng Việt) *</label>
                <Input
                  type="text"
                  value={pubForm.title}
                  onChange={(e) => setPubForm({ ...pubForm, title: e.target.value })}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Tiêu đề dịch (Tiếng Anh)</label>
                <Input
                  type="text"
                  value={pubForm.translatedTitle}
                  onChange={(e) => setPubForm({ ...pubForm, translatedTitle: e.target.value })}
                />
              </FormGroup>
              <FormRow>
                <FormGroup>
                  <label>Hội nghị / Tạp chí / Đơn vị *</label>
                  <Input
                    type="text"
                    value={pubForm.conference}
                    onChange={(e) => setPubForm({ ...pubForm, conference: e.target.value })}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Ngày / Năm xuất bản *</label>
                  <Input
                    type="text"
                    placeholder="2026-05"
                    value={pubForm.date}
                    onChange={(e) => setPubForm({ ...pubForm, date: e.target.value })}
                    required
                  />
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <label>Loại (Conference paper, Report, Journal...) *</label>
                  <Input
                    type="text"
                    value={pubForm.type}
                    onChange={(e) => setPubForm({ ...pubForm, type: e.target.value })}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Vai trò (Software, Writing, Main Researcher...)</label>
                  <Input
                    type="text"
                    value={pubForm.role}
                    onChange={(e) => setPubForm({ ...pubForm, role: e.target.value })}
                  />
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <label>ISBN</label>
                  <Input
                    type="text"
                    value={pubForm.isbn}
                    onChange={(e) => setPubForm({ ...pubForm, isbn: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <label>DOI</label>
                  <Input
                    type="text"
                    value={pubForm.doi}
                    onChange={(e) => setPubForm({ ...pubForm, doi: e.target.value })}
                  />
                </FormGroup>
              </FormRow>
              <FormGroup>
                <label>Đồng tác giả (Contributors)</label>
                <Input
                  type="text"
                  placeholder="Luong Van Linh, ..."
                  value={pubForm.contributors}
                  onChange={(e) => setPubForm({ ...pubForm, contributors: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <label>Link xem bài viết / Publication URL</label>
                <Input
                  type="text"
                  placeholder="https://..."
                  value={pubForm.url}
                  onChange={(e) => setPubForm({ ...pubForm, url: e.target.value })}
                />
              </FormGroup>
            </>
          )}

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>
            <Button type="button" $variant="secondary" onClick={closeModal}>
              Huỷ
            </Button>
            <Button type="submit">
              <SaveIcon /> {mode === "add" ? "Thêm mới" : "Cập nhật"}
            </Button>
          </div>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AdminDashboard;
