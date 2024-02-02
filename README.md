# Project: PosiTest [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
![App Screenshot](https://github.com/The-Placeholder/PosiTest/blob/dev/appPics/bo-testingsuite.jpg?raw=true)


## Overview 
- PosiTest is a code assessment administration tool designed to test Galvanize's prospective students.
- Built on PERN - Postgres, Express, React, Node 

Link to App: https://positest-e418ed52897e.herokuapp.com/


### Sample Logins for live environments
```
//Instructors
1) user: Bossman pw: abc123

//Students
1) user: tim pw: abc123
```


## Features
- Full testing suite with live chat, shared code editor, and timer
- Shared code editor that compiles and executes in real time 
- Instructor-specific controls
- Waiting lobby with routes to testing rooms and live chat
- Secure login and user registration


### Libraries & Tech:
- Vite: a Frontend build tool for React that allows for fast "bundless" development. via `npm create vite@latest`
- DaisyUi + TailwindCSS:  Lightweight CSS component based framework. (Daisy elements are easier to modify than vanilla Tailwind). https://daisyui.com/
- react-hot-toast: lightweight react toasting notification library. See: https://react-hot-toast.com/ 
- CORS: middleware for removing COR restrictions. See: https://www.npmjs.com/package/cors
- Supabase: real-time postgresql database with live updates, authentication, and instant syncing across clients. https://supabase.com/ 
- AWS S3 Bucket: remote storage service. https://aws.amazon.com/s3/ 
- bcrypt: KDF password hashing incorporating salt for authentication and security. https://www.npmjs.com/package/bcrypt 
- cookie: stores and retrieves data on client's browser for across multiple consecutive sessions
- JWT: Compact, URL-safe claims for authentication and authorization
- multer: middleware for handling multiple form data. https://www.npmjs.com/package/multer 
- Socket.io: websocket connection tool with easy-to-use connection and socket event handling. https://socket.io/ 
- monaco: lightweight, fast code editor that features Syntax Highlighting, Autocompletion, Code Folding, Intellisense, and Error Checking. https://github.com/microsoft/monaco-editor 
- axios: XMLHTTPrequest from browser. https://axios-http.com/docs/intro 


### Services - EDIT
- Heroku: deployment
- AWS S3: bucket hosting
- Supabase: postgres


## Deployment Notes -EDIT
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


#### Welcome Page
![App Screenshot](https://github.com/The-Placeholder/PosiTest/blob/dev/appPics/bo-welcomepage.jpg?raw=true)

#### Student/Instructor Lobby + Global Chat
![App Screenshot](https://github.com/The-Placeholder/PosiTest/blob/dev/appPics/bo-instructorlobby.jpg?raw=true)

#### Testing Suite 
![App Screenshot](https://github.com/The-Placeholder/PosiTest/blob/dev/appPics/bo-testingsuite.jpg?raw=true)

## More Screenshots
<details>
  <summary>More Screenshots</summary>

#### Login 
![App Screenshot](https://github.com/The-Placeholder/PosiTest/blob/dev/appPics/bo-welcomepage.jpg?raw=true)

#### Register
![App Screenshot](https://github.com/The-Placeholder/PosiTest/blob/dev/appPics/bo-welcomepage.jpg?raw=true)

#### Testing Suite + Side Chat
![App Screenshot](https://github.com/The-Placeholder/PosiTest/blob/dev/appPics/bo-welcomepage.jpg?raw=true)

#### Misc Mini Pages - Edit Profile Pic modal, Error Pages, Submit Code
![App Screenshot](https://github.com/The-Placeholder/PosiTest/blob/dev/appPics/bo-codesubmit.jpg?raw=true)
![App Screenshot](https://github.com/The-Placeholder/PosiTest/blob/dev/appPics/bo-profChange.jpg?raw=true)
![App Screenshot](https://github.com/The-Placeholder/PosiTest/blob/dev/appPics/bo-studentlobby.jpg?raw=true)
![App Screenshot](https://github.com/The-Placeholder/PosiTest/blob/dev/appPics/bo-404page.jpg?raw=true)

</details>


## Development Notes

<h3>Wireframe</h3>
<img src="https://github.com/thiem-dev/inspectify-image/blob/dev/readMeAssets/inspectify-wireframev1.jpg" alt="Wireframe" width="400" height="300">

<h3>Entity Relationship Diagram (ERD)</h3>
<img src="https://github.com/thiem-dev/inspectify-image/blob/dev/readMeAssets/inspectify-ERDv2.jpg" alt="ERD" width="400" height="300">


<h3>MobileNet Convolutional Neural Network Diagram</h3>
<img src="https://github.com/thiem-dev/inspectify-image/blob/dev/readMeAssets/MobileNet-basicCNN.jpg" alt="MobileNet CNN Diagram" width="400" height="300">

# Authors
- Aaron Roberts
    - LinkedIn https://www.linkedin.com/in/aaron-roberts-542915239/
    - Github: https://github.com/guy-jerome 
- Luke Park 
    - LinkedIn https://www.linkedin.com/in/luke-park-2a4a7928a/
    - Github: https://github.com/lukep258 
- Michael Heater 
    - LinkedIn https://www.linkedin.com/in/michael-heeter/ 
    - Github: https://github.com/Michael-Heeter 
- Thiem Huynh 
    - LinkedIn: https://www.linkedin.com/in/thiem-dev/
    - Github: https://github.com/thiem-dev
- Zoilan Bondoc 
    - LinkedIn https://www.linkedin.com/in/zoilanbondoc/ 
    - Github: https://github.com/ZenBond 
