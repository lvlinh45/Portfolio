import {
  Container,
  Header,
  ProjectItem,
  Year,
  Details,
  ProjectTitle,
  ProjectDesc,
  Tags,
  Tag,
  Links,
  GithubButton,
  DemoButton,
} from "./ProjectsStyle";
import { usePortfolioData } from "../../context/PortfolioContext";

const Projects = () => {
  const { projects } = usePortfolioData();

  return (
    <Container
      id="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Header>Projects</Header>
      {projects.map((project, index) => (
        <ProjectItem
          key={index}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <Year>{project.date}</Year>
          <Details>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDesc>{project.description}</ProjectDesc>
            {project.tags && project.tags.length > 0 && (
              <Tags>
                {project.tags.map((tag, idx) => (
                  <Tag key={idx}>{tag}</Tag>
                ))}
              </Tags>
            )}
            <Links>
              {project.github && (
                <GithubButton href={project.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </GithubButton>
              )}
              {project.webapp && (
                <DemoButton href={project.webapp} target="_blank" rel="noopener noreferrer">
                  View Website
                </DemoButton>
              )}
            </Links>
          </Details>
        </ProjectItem>
      ))}
    </Container>
  );
};

export default Projects;
