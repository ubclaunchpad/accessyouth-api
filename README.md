# :bus:   Access Youth API      [![Build Status](https://travis-ci.org/ubclaunchpad/accessyouth-api.svg?branch=develop)](https://travis-ci.org/ubclaunchpad/accessyouth-api)

The backend to support youth outreach and empowerment by facilitating easier communication between Access Youth (NPO) and troubled youth

---
Before you run locally set the env variables using the following steps: 
1. Copy over the placeholders `.env_sample` to a new file named `.env` in the same directory
2. Change the placeholders in `.env` to the actual keys posted in the slack channel

This will ensure your database connection is setup properly. 

To run locally, navigate to directory with `package.json`:

1. `npm install`

2. `npm run start`

# For development: 
`npm run dev` will watch for code changes and refresh automatically 

# Deployment: 
To access the api from the interwebs: https://access-youth-api.herokuapp.com
