const inquirer = require('inquirer');
const axios = require('axios');
const { addListener } = require('process');
const { get } = require('https');


const licenses = [{
   name : "Apache 2.0",
   icon : "![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)",
   link : "https://opensource.org/licenses/Apache-2.0",
},
{
    name : "Boost",
    icon : "![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)",
    link : "https://www.boost.org/LICENSE_1_0.txt",
},
{
    name : "Eclipse",
    icon : "![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)",
    link : "https://opensource.org/licenses/EPL-1.0",
}];


inquirer
  .prompt([
    {
        type: 'input',
        message: 'What is your project title?',
        name: 'title',
    },
    {
        type: 'input',
        message: 'Please enter a project description.',
        name: 'description',
    },
    {
        type: 'input',
        message: 'Please enter any installation instructions.',
        name: 'installation',
    },
    {
        type: 'input',
        message: 'Please enter any usage information.',
        name: 'usage',
    },
    {
        type: 'input',
        message: 'Please enter any contribution guidelines.',
        name: 'contribution',
    },
    {
        type: 'input',
        message: 'Please enter any test instructions.',
        name: 'test',
    },
    {
     
      type: 'list',
      message: 'Please select an application license',
      name: 'license',
      choices: function() {
        const arr = []
          for (let i = 0; i < licenses.length; i++) {
            arr.push(licenses[i].name)
          }
        return arr;
      }
    },
    {
        type: 'input',
        message: 'Please enter your Github username.',
        name: 'username',
    },
    {
        type: 'input',
        message: 'Please enter your email.',
        name: 'email',
    },
  ])
  .then((data) => {
    console.log(data);

    const fileName = `${data.title.toLowerCase().split(" ").join("-")}.md`;

    const title = data.title;
    const description = data.description;
    const installation = data.installation;
    const usage = data.usage;
    const contribution = data.contribution;
    const test = data.test;
    const license = data.license;

        // Code to access the Licenses Obj Data
        let licenseIndex = licenses.findIndex(function(ID){
            return ID.name === license;
        })

        console.log(licenseIndex);

    const username = data.username;
    const email = data.email;

    const fs = require('fs');


const template = 
`
${licenses[licenseIndex].icon}
# ${title}

## Description
${description}

## Table of Contents
[Installation](#installation)

[Usage](#usage)

[License](#license)

[Contributing](#contributing)

[Tests](#tests)

[Questions](#questions)

## Installation
${installation}

## Usage
${usage}

## License
For additional license information please use the following link:
${licenses[licenseIndex].link}

## Contributing
${contribution}

## Tests
${test}

## Questions
My Github username is ${username} and you can access my Github using the following link:

[My Github Profile](https://github.com/${username})

If you have any questions about this project, you can contact me by emailing ${email}.

`

    fs.writeFile(fileName, template, (err) => {
        err ? console.error(err) : console.log("Success!")
    });


  });