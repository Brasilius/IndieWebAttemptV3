---
title: NASA USLI Challenge 2025-2026
description: High powered rocketry competition, with some of the most technically complicated challenges out there.
tags: [aerospace, hardware, software, embedded systems, c++, python]
image: NASA-LOGO.png
imageAlt: NASA Logo
link: https://github.com/Brasilius/PayloadRepo2026
date: '2026-04-09'
---
<div style="display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: auto auto; gap: 0.5rem; margin: 2rem 0;">
  <video autoplay muted loop playsinline style="width: 100%; height: 100%; object-fit: cover; border-radius: 6px;">
    <source src="/videos/LVFullLaunch(trim).mp4" type="video/mp4" />
  </video>
  <video autoplay muted loop playsinline style="width: 100%; height: 100%; object-fit: cover; border-radius: 6px;">
    <source src="/videos/SubScaleLaunch(trim).mp4" type="video/mp4" />
  </video>
  <video autoplay muted loop playsinline style="width: 100%; grid-column: 1 / -1; object-fit: cover; border-radius: 6px; max-height: 320px;">
    <source src="/videos/CrashTrim.mp4" type="video/mp4" />
  </video>
</div>
<p align="center"><em>A story of success (and failures)</em></p>

## Overview


[NASA USLI](https://www.nasa.gov/learning-resources/nasa-student-launch/) or otherwise known as the University Student Launch Challenge, is a rocketry competition in which multidisciplinary teams design a high powered rocket to accomplish an objective. In the context of this year's competition I had the privilege of acting as Captain and Chief Software Architect for the Boomer Rocket Team.

![Team Photo](/teamphoto.jpg)
<p align="center"><em>Leadership Team Photo</em></p>

### This year's challenge

The challenge for this year is complex. The challenge can be broken into 2 core components. The first is the Launch Vehicle challenge, and the second is the Payload challenge.

### Launch Vehicle (LV) Challenge

![rocketCad](/rocketCAD.png)
<p align="center"><em>Rocket CAD Model</em></p>

The launch vehicle portion fundamentally challenges teams to design a predictable vehicle - in other words, predicting the performance of a custom rocket, while simultaneously meeting all competition requirements (of which there are hundreds).

For this year, we were asked to send an LV to a range between 4000 and 6000 feet, with a chosen "target [apogee](https://en.wikipedia.org/wiki/Apsis)", while also supporting a high stability margin (ensuring the rocket does not spin out) and using certified motors from commercial vendors. The team was also asked to install hardware onboard such as altimeters and gps to track the rocket. 

### Payload Challenge

![payloadCad](/payloadCAD.png)
<p align="center"><em>Payload CAD Drawings</em></p>

On the other end, there is the payload challenge - which seeks to challenge student teams across broader domains of computer science, networking, mechanical engineering, and more. 

Teams were asked to design a payload which can be autonomously operated in order to collect a sample of soil and evaluate it for various properties such as:
- Soil Conductivity (our chosen experiment)
- Nitrate Nitrite Content
- pH

Results then had to be wirelessly transmitted back to a base station, with time stamps.

There were various technical requirements also involved with the process of design, such as ensuring an adequate living space for "Stemnauts"(model astronauts of our choosing), the physical mechanism for extracting soil, as well as the amount of soil that had to be extracted (minimum of 50 mL), and many more!

### Our approach

<p align="center"><em>"TL;DR:" Instead of buying all our parts, we vertically integrated.</em></p>

Our team's approach to this challenge, was less designing a rocket and more designing a foundation. We wanted to fundamentally control every aspect of our design, and lower dependence on outside suppliers (in other words [vertically integrate](https://www.investopedia.com/terms/v/verticalintegration.asp)) our projects wherever possible. **This led to stellar results across our stack.** By fundamentally taking control of the production and design of our stack and lowering dependence on commercial suppliers, the level of control, granularity and reproducibility of our results skyrocketed. We also saw incredible financial benefits from vertically integrating - lowering the cost of several subsystems by upwards of *3x*...

### Launch Vehicle
Our approach to this challenge was an [L-1390](https://www.thrustcurve.org/motors/AeroTech/L1390G/) powered custom launch vehicle. To begin this portion, we had several design goals with the LV this year, involving the vertical integration mentioned prior. Some of those are listed below:
- Fully Carbon Fiber Tubes
- Custom Nose Cone Geometry and Design
- Increased Reliance on 3D Printing for Components
- Higher emphasis on "Smart Rocket" features

These are some ambitious goals and I'm excited to talk about how we approached them!

For instance with regards to the carbon fiber tubes, we constructed an open source winding machine, using 3D printed parts and a mandrel we found lying inside the engineering bay to fully construct our tubes. 

![Winding Machine](/WindingMachine.JPG)
<p align="center"><em>"Contraption" Open Source Winding Machine</em></p>

Doing this allowed us to produce carbon fiber tubes at a genuine **fraction** of the price that they normally are. The cost reduction aligned somewhere in the range **3x**, and that's a conservative estimate. The team has been able to procure high quality carbon fiber tows for less than a hundred dollars making the reduction closer to **5x - 6x** (From 350$+ to 40$ on the cheap end!). We were also very successful in other ways - initial testing and weight assessments showed that our tubes maintained rigidity while also being close to 6 lbs lighter than initially estimated. 

The weight reduction was due to a non-critical manufacturing defect involving blue tube and the mandrel, and was later incorporated into official production thanks to the benefits!

![Full Scale LV](/FullScaleLV.png)
<p align="center"><em>Completed Full Scale LV</em></p>

As can be seen above, our Full Scale LV was successfully manufactured, and is a genuine beauty of carbon fiber. We look forward to taking the lessons we learned with manufacturing here and taking them into the next competition year.

### Payload

Our payload took much of the same approach we used for the LV - which was lowering reliance on external suppliers and factors as much as physically possible, in favor of internally tested and developed solutions.

In functional terms, that means that we:
- Designed our own soil extraction system
- Manufactured our soil extraction system in-house
- Validated and tested the design
- Extensively built hardware where possible
<div align="center">   
    <img src="/FinalPayloadDrawing.png" alt="Final Payload Model">                                    
  </div>                                   
<p align="center"><em>Final Payload Model</em></p>

Our payload had to meet multiple goals as mentioned at the start of this project. Among them was the ability to physically extract 50 mL soil, and contain it within the physical borders of the payload. To this end, the team decided on an auger based design, in which the center body of the payload could rotate on its axis, and position an auger facing straight downwards. From there we had to analyze the various failure modes associated with operation of the payload.

![Auger](/AugerDrillBit.jpg)
<p align="center"><em>Auger Drill Bit Failure</em></p>

For instance - a unique failure mode we did not anticipate was associated with the method of production. Our first iteration of the Auger was a 3D printed variant, and when we tested it - the auger failed along the lines of the 3D print gradient. In other words a fault associated with 3D printing itself, forcing us to reconsider the process of production entirely!

Taking that lesson forward, we investigated welding our own auger using metallic materials, as this avoided the 3D print gradient issue.

In creating our own auger, we were able to reach the tolerances and dimensions we needed to perform at competition, as simply put - there were no commercial augers that met our specifications!

![SoilTest](/SoilTesting.jpg)
<p align="center"><em>Soil Extraction Test</em></p>

As a final note before we move into the software portion, it's crucial to mention how we progressed our science experiment for the payload challenge. As the software architect, during the process of testing our soil evaluation capabilities, I came to a crucial discovery - of the three experiments we were asked to perform (and choose from) - the only process which remained scientifically accurate without needing an onboard water sample (which could complicate the dynamics of the launch), was electrical conductivity. Electrical conductivity as an experiment requires the moisture in the sample itself to remain unaffected in order to ensure that the sample is accurate - and as such bringing water with us, compromises the experiment!

Again same as the original LV, we took the lessons we learned in designing and creating the payload and brought it forward to software evaluation.

### Software

The software stack for this project is where the majority of my time and focus went for this team. As the only member with a solid understanding of DevOps practices and deeper experiences with Linux SBC's and Microcontrollers, I took the lead here.

As a quick note - all source code can be viewed [here](https://github.com/Brasilius/PayloadRepo2026). I'm going to avoid massive code blocks here for readability's sake, but I highly encourage taking a look at the source code!

<div style="display: flex; justify-content: center; align-items: center; gap: 2rem; margin: 2rem 0; flex-wrap: wrap;">
  <img src="/logos/linux.svg" alt="Linux" style="height: 48px; width: auto;" />
  <img src="/logos/python.svg" alt="Python" style="height: 48px; width: auto;" />
  <img src="/logos/cpp.svg" alt="C++" style="height: 48px; width: auto;" />
  <img src="/logos/raspberrypi.svg" alt="Raspberry Pi" style="height: 48px; width: auto;" />
   <img src="/logos/Arduino.svg" alt="Arduino" style="height: 48px; width: auto;" />
    <img src="/logos/Git.svg" alt="Git" style="height: 48px; width: auto;" />
</div>

To begin software, I think it makes sense to explain the underlying concept that drove the development of the software to where it is now. 

[Finite state machines](https://en.wikipedia.org/wiki/Finite-state_machine) (or FSMs as we're going to refer to them from now on) are a mathematical model of computation in which a machine can exist in exactly one state of many states. States in this context refer to things like "low power mode" on your phone - basically it's just ensuring that your hardware is solely focused on accomplishing one task at a time where possible.

For our project, we identified that several subsystems onboard the rocket had to use state machines for a variety of crucial reasons - but most critical among them was NASA's accountability requirement. NASA prohibits automatic state transitions, as to ensure that teams have as much control as physically possible on LV operations - especially when it comes to releasing a separated payload. The ability to abort a separation is just as important as the ability to separate.


With all that in mind, I think it's appropriate to begin introducing the hardware based on subsystem.

### Base Station

The base station hardware wise, is the least complex system in the stack - composed of just an Esp32, a RYLR998 LoRa Transceiver and a USB-C cable to your laptop. 

Similarly the software is also very simple by comparison. We can fundamentally divide the operation of the base station into 4 separate states - and this defines the code structure by proxy.

- State 1: Listener (Link to Payload Separator)
- State 2: Sender (Link to Payload Separator)
- State 3: Sender (Link to Payload)
- State 4: Listener (Link to Payload)

Essentially, each state determines the mode of operation for base station - which in this case is the target of the command, and similarly how to receive the information from the partner computer board. Since each board has a different transmission and retrieval - the base station needs to modify its parser for the information such that the information coming is still understandable for any ground operator. 


#### Testing

 During the timeline of development, we wanted to verify the capabilities of our hardware, and given the fact that we're students - we chose the easiest way to do that. We had one team of people stay in the middle of a field (with a base station) and another group of people drive the other way in a car. 

 **here is where me being raised in a European family accidentally worked in our favor** - during the design and selection process - I misheard 2000 feet for 2000 meters, and designed the system to be able to communicate at those ranges. This of course, was *blatant* overkill for the project - but I'm not complaining about the results. 

 We achieved a 100% receive rate (no packets lost) while one receiver was in a moving car, with no line of sight - basically showing that we were in a faraday cage environment at over a kilometer away and still able to perform the needed duties of the project.


### Nose Cone Electronics Bay

The nose cone brought a whole new host of issues into the mix. For one - on top of having to worry about how to implement a wireless protocol, and vertically integrating an altimeter tech stack to reduce costs - we also had to ensure that it was capable of withstanding 9 G's of acceleration. The build was relatively simple however required a lot of manual tinkering. 

<div align="center">   
    <img src="/NoseConeCircuits.jpg" alt="Nose Cone Circuits.">                                    
  </div>                                   
<p align="center"><em>A LOT of Tinkering</em></p>



The purpose of the nose cone electronics were to be a manual separator of the payload module and the launch vehicle, while also running dual purpose as a live telemetry altimeter.

We designed this system with an I2C Altimeter and a standard UART LoRa Transceiver, all wired in tandem to an ESP32. We also connected via a logic level MOSFET, an E-Match powered wire cutter. Essentially following the concept of operations, once a ground operator received a read out indicating that a certain altitude had been reached, they could fire the e-match and separate the payload for a full deployment. 

Some of the more technical aspect of this system were things involved with asynchronous computing and frequency - as noted prior NASA has a strict set of requirements involved with ensuring that all systems onboard are designed with intention and purpose. To this end - NASA asked us specifically to tune our transmissions to the frequency of ```914.5``` MHz in order to ensure that wireless bands on launch day were not interrupted. Furthermore we spent a great amount of effort ensuring that all hardware that was connected was functional over a ```115200``` baud rate.

### Payload

The payload is the most complex software system onboard the Launch Vehicle - and broadly across the entire project. 

It functions through the benefits provided by using a Linux single board computer. We used a custom version of ```Raspbian``` OS. 

Because this is a fully functional operating system, we are able to take advantage of multi-threading on a *relatively* powerful arm cpu and 2 whole gigabytes of RAM. 

Multi-threading in this context refers to the ability to run multiple programs concurrently - which as far as the Esp32 setups are concerned is not possible. We used the ```Threading``` and ```Subprocess``` modules on Python (via UV by astral) to create a Python orchestration layer that can call subservient C++ helper functions. This means that we get the ease and simplicity of python for the logic that dictates the payload finite state machine, while retaining the speed and performance requirements derived from the hardware from C++. This is needed because in several contexts, Python's non-deterministic execution could present an obstacle in time critical tasks like wireless communication, potentially missing packets and data!

There are currently 4 C++ helper programs that we run concurrent to the orchestrator:

- transmitter.cpp
- receiver.cpp
- modbus.cpp
- motor.cpp

Each of these dictate a separate process that needs to be managed or called by the state machine. The standard run time for the project can be boiled down to the following:

- Python orchestrator is started via ```uv run main.py```
- ```main.py``` starts a ```thread``` for receiving data packets and listens constantly
- Upon receiving a signal, ```motor.cpp``` is called and begins extracting soil.
- When soil and motor are situated inside the payload, ```modbus.cpp``` is called, and the soil data is loaded into the ```buffer``` of the python program.
- Then the ```transmitter.cpp``` program is called and sends the data to the base station.
- From there the base station configures a ```javascript``` dashboard native in the browser to show the information live to an operator!

Fundamentally what I wanted to achieve with a python orchestration layer was fairly simple - operational simplicity without incurring the technical debt from trying to make python something it just isn't. By using C++ helper functions we get to maintain operational simplicity without sacrificing the runtime speed of a pre-compiled language like C++.


<div align="center">   
    <img src="/PayloadCollectionandTestChamber.png" alt="Payload Test and Collection Bay.">                                    
  </div>                                   
<p align="center"><em>Payload Test and Collection Bay</em></p>

#### Testing

Testing the payload involved 2 distinct branches across hardware and software testing.

Software testing in context to the payload refers to the ability to verify edge case scenarios as far as inputs are concerned and challenging the fundamental boundaries of the code. For instance suppose we have the altimeter sending the data regarding its altitude in meters - if we exceed a certain altitude such that the quantity of digits being sent exceeds the limitations of our parser - it causes an error.


#### Soil Evaluation
Soil evaluation for the payload came in the form of a 7-1 Cheap Soil Sensor we found on AliBaba sourced from China. When the sensor arrived it was paired with a small instruction manual with minimal instructions on how to use it - and even worse - implying that the hardware only worked with Windows. Windows in an embedded context is an absolute no-go and dealbreaker - but thankfully the developers of the soil sensor did leave behind some crucial clues. They revealed that the hardware was powered by ModbusRTU and we could access the information on board via registers on-board the sensor itself. 

There were 2 key concepts to unlocking the power of the sensor itself - and that was the interrogation frame and the retrieval frame - which provided the framework by which we could send bytes to both receive and command the sensor. After a substantial amount of testing, we were able to successfully pull data from the sensor using a custom ModbusRTU implementation! Calling the register  ```0x0015``` over the default baud rate ```9600``` allowed us to pull the soil conductivity reliably!



### Failure Analysis

Failure analysis around our second full scale launch was extensive and began with a huge amount of retroactive video playback. To begin analyzing why the rocket crashed we had to understand the underlying physics that led to the crash to begin with.

<div align="center">   
    <img src="/RocketStabilityLoss.png" alt="Rocket Stability Loss">                                    
  </div>                                   
<p align="center"><em>Rocket Stability Loss</em></p>

Across aerospace, an incredibly important concept to the development of a vehicle is static stability. This refers to the phenomenon that occurs when a vehicle is moving through fluid (such as air in this case) where the fluid applies force to the vehicle such that it is returned to its original orientation. We clearly lost this ability during this flight, leading to an extensive investigation into the why.


<div align="center">   
    <img src="/ANSYSBoundaryLayer.png" alt="Boundary Layer.">                                    
  </div>                                   
<p align="center"><em>Boundary Layer Analysis</em></p>

Our first thought was around the launch angle of the vehicle - during the day of the launch the videos we had, showed the vehicle sitting at a pretty aggressive launch angle (around 6 degrees) - Since the vehicle had a pretty aggressive angle of attack we believed that its velocity off the rail perhaps was not sufficient to account for stability. However after running a couple of simulations - our rocket clearly should have been able to withstand even up to an 8 degree launch. So we kept looking.

<div align="center">   
    <img src="/AnsysFinFluidFlow.png" alt="Flow Analysis.">                                    
  </div>                                   
<p align="center"><em>Flow Analysis</em></p>


Then we started charting the velocity differences between our first launch and our second launch - and we discovered something interesting. 

<div align="center">   
    <img src="/FlightVelocityComparison.png" alt="Flight Velocity Comparison.">                                    
  </div>                                   
<p align="center"><em>Flight Velocity Comparison</em></p>

The orange line is the failed launch and the blue is the successful flight - as can be clearly seen, the velocity off the rail for the failed flight was substantially lower than the first. 

Now we're getting somewhere - we have our first tangible touch of data indicating there was a substantial failure somewhere in our launch proceedings. But again - that alone should not have led to the complete loss of stability seen. Clearly we were still missing something else.

That's when it hit us... our payload has a crucial modification that may have led to the disaster as well. In prior test runs, the payload had a simulated mass which was fundamentally static - however for the run in question now we had used sand to artificially increase the weight of the payload since the goal of the run was to prove payload separation. 

Ultimately the conclusion that we had come to was that the failure was due to a combination of cascading failures, including but not limited to:
- An aggressive launch angle
- A slow burning L-Class motor
- Center of gravity being modified due to payload weight distribution

### Conclusion

Although we could not attend Huntsville, Alabama to launch our rocket due to a combination of supply chain constraints and the timing of the rocket crash - we still achieved every single goal we wanted to achieve with this team. The team built tooling that will last generations of students, permanently lowering the cost of carbon fiber manufacturing by a massive margin. We designed embedded systems that far outperformed commercial counterparts, with safety built in as the priority, not secondary - and made sure it's open source so that everyone can benefit from the work we did - not just us. We challenged the status quo of our University, and created the foundation for a team that is not just aerospace engineers but represents all disciplines from fine arts to computer science and aerospace engineering. 

![Nasa Logo](/NASA-LOGO.png)