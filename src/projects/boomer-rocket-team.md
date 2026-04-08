---
title: NASA USLI Challenge 2025-2026
description: High powered rocketry competition, with some of the most technically complicated challenges out there.
tags: [aerospace, hardware, software, embedded systems, c++, python]
image: NASA-LOGO.png
imageAlt: NASA Logo
link: https://github.com/Brasilius/PayloadRepo2026
date: '2026-04-09'
---
![NASA Logo](/NASA-LOGO.png)
## Overview

[NASA USLI](https://www.nasa.gov/learning-resources/nasa-student-launch/) or otherwise known as the University Student Launch Challenge, is a rocketry competition in which multidisciplinary teams, design a high powered rocket to accomplish an objective. In context to this year's competition I had the privilege of acting as Captain and Chief Software Architect for the Boomer Rocket Team.

![Team Photo](/teamphoto.jpg)

### This years challenge

The challenge for this year is complex. The challenge can be broken into 2 core components. The first is the Launch Vehicle challenge, and the second is the Payload challenge.

#### Launch Vehicle (LV) Challenge

![rocketCad](/rocketCAD.png)

The launch vehicle portion fundamentally challenges teams to design a predictable vehicle - in other words, predicting the performance of a custom rocket, while simultaneously meeting all competition requirements (of which there are hundreds).

For this year, we were asked to send an LV to a range between 4000 and 6000 feet, with a chosen "target [apogee](https://en.wikipedia.org/wiki/Apsis)", while also supporting a high stability margin (ensuring the rocket does not spin out) and using certified motors from commercial vendors. The team was also asked to install hardware onboard such as altimeters and gps to track the rocket. 

#### Payload Challenge

![payloadCad](/payloadCAD.png)


On the other end, there is the payload challenge - which seeks to challenge student teams across broader domains of computer science, networking, mechanical engineering, and more. 

Teams were asked to design a payload which can be autonomously operated in order to collect a sample of soil and evaluate it for various properties such as:
- Soil Conductivity (our chosen experiment)
- Nitrate Nitrite Content
- PH

There were various technical requirements also involved with the process of design, such as ensuring an adequate living space for "Stemnauts"(model astronauts of our choosing), how soil was to be extracted, how much soil was to be extracted(50 mL), and more!

### Our approach

Our approach to this challenge was an [L-1390](https://www.thrustcurve.org/motors/AeroTech/L1390G/) powered custom launch vehicle, in which we as a team designed every component used in the LV, from the body tubes, to the nose cone. We wanted to own our process and optimize it from the ground up.In theory this would allow us to reduce costs, and iterate at far higher scales then what was previously possible. We also wanted to build our software stack from the ground up where possible - as this would allow the team to develop at a far greater pace and iterate quicker.

I think the easiest example to provide towards this method working is involved with the cost savings with our altimeter system. Our custom stack for the altimeter was roughly~ 30$USD and provided us live telemetry - where as most off the shelf commerical solutions were 2x more expensive and did not provide live telemetry to our ground station.

#### Launch Vehicle
placeholder

#### Payload
placeholder

### Technical Challenges (of all kinds)

### Did it pay off?

