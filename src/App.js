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
        <h2 class="fixed-name">Denis Hadjivelichkov</h2>
        <h1>About me</h1>
        <img src={`${process.env.PUBLIC_URL}/images/profile-photo.jpg`} alt="Profile" className="profile-photo"/>
        <p>
          I am a PhD student at 
          the <a href="https://www.ucl.ac.uk/ai-centre/">CDT for Foundational AI</a>, <a href="https://www.ucl.ac.uk/">UCL</a>, 
          where I work on bridging the gap between robotics 
          and intelligence through machine learning. 
          My recent interests include
          semantic correspondences, 
          world models, neural radiance fields, and imitation learning with diffusion.
          I am part of 
          the <a href="https://rpl-as-ucl.github.io/">Robot Perception and Learning Lab</a>.
        </p>
        <p>
        <a href="https://www.linkedin.com/in/denishadjivelichkov/" target="_blank">
          LinkedIn
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a href="mailto:dennis.hvel@gmail.com" target="_blank">
          Email
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a href="https://scholar.google.com/citations?hl=en&user=pFSbKWMAAAAJ" target="_blank">
          Scholar
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a href="CV.pdf" target="_blank">
        CV
        </a>
        
        </p>
      </header>
      <h1>Projects & Publications</h1>
      <h4>Full list of publications available on
      &nbsp;<a href="https://scholar.google.com/citations?hl=en&user=pFSbKWMAAAAJ" target="_blank">
        Google Scholar</a>
      </h4>
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
