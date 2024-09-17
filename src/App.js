import React, { useState, useEffect } from 'react';
import './App.css';
import ProjectCard from './ProjectCard';
import projectsData from './projects.json';
import ExperienceTimeline from './ExperienceTimeline';
import experiencesData from './timeline.json';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // This assumes your projects.json is stored in the public folder
    // If it's in src, you can directly import it as done above
    setProjects(projectsData);
  }, []);     
  return (
    <div className="App">
      <header className="App-header">
        <h2 class="fixed-name">Luke Beddow</h2>
        <h1>About me</h1>
        <img src={`${process.env.PUBLIC_URL}/images/profile-photo.png`} alt="Profile" className="profile-photo"/>
        <p>
          I am a roboticist with expertise in machine learning, grasping, and hardware integration.
          I have almost completed a PhD at <a href="https://www.ucl.ac.uk/">UCL</a> as part of
          the <a href="https://rpl-as-ucl.github.io/">Robot Perception and Learning Lab</a>.
        </p>
        <p>
        <a href="CV.pdf" target="_blank">
        CV
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a href="mailto:lukebeddow@gmail.com" target="_blank">
          Email
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a href="https://scholar.google.com/citations?user=Dx_CURwAAAAJ&hl=en&oi=ao" target="_blank">
          Scholar
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a href="https://github.com/lukebeddow" target="_blank">
          Github
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a href="https://www.linkedin.com/in/luke-beddow-130264171/" target="_blank">
          LinkedIn
        </a>
        </p>
      </header>
      <h1>Projects & Publications</h1>
      {/* <h4>Full list of publications available on
      &nbsp;<a href="https://scholar.google.com/citations?user=Dx_CURwAAAAJ&hl=en&oi=ao" target="_blank">
        Google Scholar</a>
      </h4> */}
      <div className="Projects-container">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <h1>Roles & Experience</h1>
      <h4>More detailed CV available
      &nbsp;<a href="CV.pdf" target="_blank">
        here</a>
      </h4>
      <ExperienceTimeline experiences={experiencesData}/>
    </div>
  );
}

export default App;
