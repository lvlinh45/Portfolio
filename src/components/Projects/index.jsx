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
import { projects } from "../../data/constants";

const Projects = () => {
  return (
    <Container id="projects">
      <Header>Projects</Header>
      {projects.map((project, index) => (
        <ProjectItem key={index}>
          <Year>{project.date}</Year>
          <Details>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDesc>{project.description}</ProjectDesc>
            <Tags>
              {project.tags.map((tag, idx) => (
                <Tag key={idx}>{tag}</Tag>
              ))}
            </Tags>
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
