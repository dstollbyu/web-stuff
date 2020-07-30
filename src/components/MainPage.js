import React from 'react';
import Navbar from './Navbar.js';
import linkedinLogo from '../images/LI-In-Bug.png';
import githubLogo from '../images/GitHub-Mark-120px-plus.png';
import ProjectTile from './projectTile.js';


const MainPage = () => {
  // navbarArgs holds the values to be used in the header navbar
  const navbarArgs = [
    {
      link: "#welcome-section",
      name: "Welcome"
    },
    {
      link: "#project-section",
      name: "Projects"
    }
  ]

  // Values for the ProjectTile components
  const pomoValues = {
    svg: <svg width="64" height="64" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/> <path fillRule="evenodd" d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/> <path fillRule="evenodd" d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/> </svg>,
    info: <><p>Pomodoro Clock is a countdown timer that is used to break down work into intervals separated by short breaks. You can read more about the technique <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="_blank" rel="noopener noreferrer">here</a>.</p><p>For this app, I used the following:</p><ul><li>CSS</li><li>Bootstrap</li><li>JavaScript</li><li>React</li></ul></>
  }

  const markValues = {
    svg: <svg width="64" height="64" viewBox="0 0 16 16"><path d="M8.39 12.648a1.32 1.32 0 0 0-.015.18c0 .305.21.508.5.508.266 0 .492-.172.555-.477l.554-2.703h1.204c.421 0 .617-.234.617-.547 0-.312-.188-.53-.617-.53h-.985l.516-2.524h1.265c.43 0 .618-.227.618-.547 0-.313-.188-.524-.618-.524h-1.046l.476-2.304a1.06 1.06 0 0 0 .016-.164.51.51 0 0 0-.516-.516.54.54 0 0 0-.539.43l-.523 2.554H7.617l.477-2.304c.008-.04.015-.118.015-.164a.512.512 0 0 0-.523-.516.539.539 0 0 0-.531.43L6.53 5.484H5.414c-.43 0-.617.22-.617.532 0 .312.187.539.617.539h.906l-.515 2.523H4.609c-.421 0-.609.219-.609.531 0 .313.188.547.61.547h.976l-.516 2.492c-.008.04-.015.125-.015.18 0 .305.21.508.5.508.265 0 .492-.172.554-.477l.555-2.703h2.242l-.515 2.492zm-1-6.109h2.266l-.515 2.563H6.859l.532-2.563z"/></svg>,
    info: <><p> Markdown is a text-to-HTML conversion tool for web writers, and this preview app allows you to see what the output looks like when you type in Markdown. You can read more about it <a href="https://daringfireball.net/projects/markdown/" target="_blank" rel="noopener noreferrer">here</a>. </p> <p> For this app, I used the following: </p> <ul> <li>CSS</li> <li>Bootstrap</li> <li>JavaScript</li> <li>React Redux</li> </ul></>
  }

  const searchValues = {
    svg: <svg width="64" height="64" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/> <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/> </svg>,
    info: <><p> I used the hacker news API to generate a list of stories. I also created a search bar for that list. Click <a href="https://hn.algolia.com/api" target="_blank" rel="noopener noreferrer">here</a> for the hacker news API. I made this based on instruction found in <a href="https://www.roadtoreact.com/" target="_blank" rel="noopener noreferrer"><i>The Road to React</i></a> by Robin Wieruch. </p> <p> For this app, I used the following: </p> <ul> <li>CSS</li> <li>JavaScript</li> <li>React (Hooks)</li> <li>Jest (for testing)</li> </ul></>
  }

  return (
    <div>
      <Navbar links={navbarArgs} />

      <main>
        {/* Welcome begin */}
        <section id="welcome-section" name="welcome-section">
          <h1>Welcome!</h1>
          <p>My name is <b>Darren Stoll</b>.</p>
          <p>I am an aspiring web developer with a focus on JavaScript and related libraries.</p>
          <p>I am currently proficient in HTML, CSS, JavaScript, and React.</p>
          <p>Currently, I'm getting more familiar with React and Node.js.</p>
          <p>I am always learning!</p>
          {/* Putting links here in buttons to various resources about myself */}
          <div id="links">
              {/* image source for icons from icons8.com */}
              <a href="https://www.linkedin.com/in/darren-stoll-5849791ab/" target="_blank" rel="noopener noreferrer"><img className="linkedinIcon" src={linkedinLogo} alt="LinkedIn Profile" title="LinkedIn Profile" /></a>
              <a href="https://github.com/dstollbyu" target="_blank" rel="noopener noreferrer"><img className="githubIcon" src={githubLogo} alt="GitHub Profile" title="GitHub Profile" /></a>
          </div>
          <p>Scroll down to see what I have to show you.</p>
        </section>
        {/* Welcome end */}
        {/* Projects begin */}
        <section id="project-section" className="hidden" name="project-section">
          <h2>Highlighted showcase projects</h2>
          <div id="projects" name="projects">
            <ProjectTile name="Pomodoro Clock" icon={pomoValues.svg} link="/PomodoroClock" target="pomoModal" info={pomoValues.info} />
            <ProjectTile name="Markdown Preview" icon={markValues.svg} link="/MarkdownPreview" target="markModal" info={markValues.info} />
            <ProjectTile name="Search Page" icon={searchValues.svg} link="/SearchPage" target="searchModal" info={searchValues.info} />
          </div>
        </section>
        {/* Projects end */}
      </main>
    </div>
  )
}

export default MainPage;