const core = require('@actions/core')
const gitHub = require('@actions/github')

let thermometerId = core.getInput('thermometer-id');
let raw = core.getBooleanInput('raw');

// read file content from /sys/bus/w1/devices/28-000006d9d8ff/w1_slave
const fs = require('fs');
const path = require('path');
const filePath = path.join('/sys/bus/w1/devices/', thermometerId, '/w1_slave');

// store file content in variable and divide by 1000
let fileContent = fs.readFileSync(filePath, 'utf8');

// return temperature as output
if (raw) {
    core.setOutput('temperature', fileContent);
} else {
    core.setOutput('temperature', fileContent.split('t=')[1] / 1000);
}