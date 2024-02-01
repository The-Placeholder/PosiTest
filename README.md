# Project: PosiTest [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
![App Screenshot](https://github.com/thiem-dev/inspectify-image/blob/dev/readMeAssets/inspectify-mainv1.jpg)


## Overview 
- PosiTest is a code assessment administration tool designed to test Galvanize's prospective students.
- Built on PERN - Postgres, Express, React, Node 

Link to App: https://positest-e418ed52897e.herokuapp.com/


## Features
- Full testing suite with live chat, shared code editor, and timer
- shared code editor that compiles and executes in real time 
- Instructor-specific controls
- Waiting lobby with routes to testing rooms and live chat
- Secure login and user registration
- 

### Libraries & Tech:
- Vite: a Frontend build tool for React that allows for fast "bundless" development. TLDR: It's for mainly for better CRA (create-react-app) via `npm create vite@latest`
- DaisyUi + TailwindCSS:  Lightweight CSS component based framework. (Daisy elements are easier to modify than vanilla Tailwind)
- Toastify: A lightweight JS notification library. See: https://apvarun.github.io/toastify-js/
- CORS: middleware for removing COR restrictions. See: https://www.npmjs.com/package/cors
- Supabase: real-time postgresql database with live updates, authentication, and instant syncing across clients 
- Amazon Web Services SDK: remote storage service
- bcrypt: KDF password hashing incorporating salt for authentication and security
- cookie: stores and retrieves data on client's browser for across multiple consecutive sessions
- JWT: Compact, URL-safe claims for authentication and authorization
- multer: middleware for handling multiple form data
- socket.io: websocket connection tool with easy-to-use connection and socket event handling
- monaco: lightweight, fast code editor that features Syntax Highlighting, Autocompletion, Code Folding, Intellisense, and Error Checking
- axios: XMLHTTPrequest from browser


### Services
- Heroku: deployment
- AWS S3: bucket hosting
- Supabase: postgres


## Deployment Notes
- Heroku


## Local Test
<details>
  <summary>Running Locally</summary>

- Clone repo
- App is split into client and server side.
- Plug in `.env` variables
    - See .env.template for variables
    - Create supabase database
    - Seed & migrate into supabase database
- Create AWS S3
- CD into Client, run 'npm install', 'npm run dev'
- On a separate terminal, 'npm install', 'npm run dev-server'
- 

### Server Side
- `npm install`
- `npm run dev-server`



### Client Side
- `cd client`
- `npm install`
- `npm run dev`

</details>


## App States Screenshots
![App Screenshot](https://github.com/thiem-dev/inspectify-image/blob/dev/readMeAssets/inspectify-herov1.jpg)
![App Screenshot](https://github.com/thiem-dev/inspectify-image/blob/dev/readMeAssets/inspectify-mainBv1.jpg)


## Development Notes

<h3>Wireframe</h3>
<img src="https://github.com/thiem-dev/inspectify-image/blob/dev/readMeAssets/inspectify-wireframev1.jpg" alt="Wireframe" width="400" height="300">


<h3>Entity Relationship Diagram (ERD)</h3>
<img src="https://github.com/thiem-dev/inspectify-image/blob/dev/readMeAssets/inspectify-ERDv2.jpg" alt="ERD" width="400" height="300">


<h3>MobileNet Convolutional Neural Network Diagram</h3>
<img src="https://github.com/thiem-dev/inspectify-image/blob/dev/readMeAssets/MobileNet-basicCNN.jpg" alt="MobileNet CNN Diagram" width="400" height="300">

# Authors
- Aaron Roberts https://www.linkedin.com/in/aaron-roberts-542915239/
- Luke Park https://www.linkedin.com/in/luke-park-2a4a7928a/
- Michael Heater https://www.linkedin.com/in/michael-heeter/
- Thiem Huynh https://www.linkedin.com/in/thiem-dev/
- Zoilan Bondoc https://www.linkedin.com/in/zoilanbondoc/
