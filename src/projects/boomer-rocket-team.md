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

[NASA USLI](https://www.nasa.gov/learning-resources/nasa-student-launch/) or otherwise known as the University Student Launch Challenge, is a rocketry competition in which multidisciplinary teams, design a high powered rocket to accomplish an objective. In context to this year's competition I had the privilege of acting as Captain and Chief Software Architect for the Boomer Rocket Team.

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
- Ph

Results then had to be wirelessly transmitted back to a base station, with time stamps.

There were various technical requirements also involved with the process of design, such as ensuring an adequate living space for "Stemnauts"(model astronauts of our choosing), the physical mechanism for extracting soil, as well as the amount of soil that had to be extracted (minimum of 50 mL), and many more!

### Our approach

Our teams approach to this challenge, was less designing a rocket and more designing a foundation. We wanted to fundamentally control every aspect of our design, and lower dependence on outside suppliers (in other words [vertically integrate](https://www.investopedia.com/terms/v/verticalintegration.asp)) our projects wherever possible. **This led to stellar results across our stack.** By fundamentally taking control of the production and design of our stack and lowering dependence on commercial suppliers, the level of control, granularity and reproducibility of our results skyrocketed. We also saw incredible financial benefits from vertically integrating - lowering the cost of several subsystems by upwards of *3x*...

### Launch Vehicle
Our approach to this challenge was an [L-1390](https://www.thrustcurve.org/motors/AeroTech/L1390G/) powered custom launch vehicle. To begin this portion, we had several design goals with the LV this year, involving the vertical integration mentioned prior. Some of those are listed below:
- Fully Carbon Fiber Tubes
- Custom Nose Cone Geometry and Design
- Increased Reliance on 3D Printing for Components
- Higher emphasis on "Smart Rocket" features

As can be clearly seen, these are some fairly ambitious goals, which is why I'm proud to say that we smashed through every single one of them!

For instance with regards to the carbon fiber tubes, we constructed an open source winding machine, using 3D printed parts and a mandrel we found lying inside the engineering bay to fully construct our tubes. 

![Winding Machine](/WindingMachine.JPG)
<p align="center"><em>"Contraption" Open Source Winding Machine</em></p>

Doing this allowed us to produce carbon fiber tubes at a genuine **fraction** of the price that they normally are. The cost reduction aligned somewhere in the range **3x**, and that's a conservative estimate. The team has been able to procure high quality carbon fiber tows for less than a hundred dollars making the reduction closer to **5x - 6x** (this process also applied to onboard electronics covered later, where we also achieved similar cost reductions with improved performance too!). We were also very successful in other ways - initial testing and weight assessments showed that our tubes maintained rigidity while also being close to 6 lbs lighter than initially estimated. 

The weight reduction was due to a non-critical manufacturing defect involving blue tube and the mandrel, and was later incorporated into official production thanks to the benefits!

![Full Scale LV](/FullScaleLV.png)
<p align="center"><em>Completed Full Scale LV</em></p>

As can be seen above, our Full Scale LV was successfully manufactured, and is a genuine beauty of carbon fiber. We look forward to taking the lessons we learned with manufacturing here and taking them into the next competition year.

### Payload

Following the ideas of vertical integration, our payload took much of the same approach - which was lowering reliance on external suppliers and factors as much as physically possible.

In functional terms, that means that we:
- Designed our own soil extraction system
- Manufactured our soil extraction system in-house
- Validated and tested the design
- Extensively built hardware where possible

![FinalPayloadCAD](/FinalPayloadDrawing.png)
<p align="center"><em>Final Payload Model</em></p>

Our payload had to meet multiple goals as mentioned at the start of this project. Among them was the ability to physically extract 50 mL soil, and contain it within the physical borders of the payload. To this end, the team decided on an auger based design, in which the center body of the payload could rotate on its axis, and position an auger facing straight downwards. From there we had to analyze the various failure modes associated with operation of the payload.

![Auger](/AugerDrillBit.jpg)
<p align="center"><em>Auger Drill Bit Failure</em></p>

For instance - a unique failure mode we did not anticipate was associated with the method of production. Our first iteration of the Auger was a 3D printed variant, and when we tested it - the auger failed along the lines of the 3D print gradient. In other words a fault associated with 3D printing itself, forcing us to reconsider the process of production entirely!

Taking that lesson forward, we investigated welding our own auger using metallic materials, as this avoided the 3D print gradient issue.

In creating our own auger, we were able to reach the tolerances and dimensions we needed to perform at competition, as simply put - there were no commercial augers that met our specifications!

![SoilTest](/SoilTesting.jpg)
<p align="center"><em>Soil Extraction Test</em></p>

As a final note before we move into the software portion, it's crucial to mention how we progressed our science experiment for the payload challenge. As the software architect, during the process of testing our soil evaluation capabilities, I came to a crucial discovery - of the three experiments we were asked to perform (and choose from) - the only process which remained scientifically accurate without needing an onboard water sample (which could complicate the dynamics of the launch), was electrical conductvity. Electrical conductivity as an experiment requires the moisture in the sample itself to remain unaffected in order to ensure that the sample is accurate - and as such bringing water with us, compromises the experiment!

Again same as the original LV, we took the lessons we learned in designing and creating the payload and brought it forward to software evaluation.

### Software

The software stack for this project is where the majority of my time and focus went for this team. As the only member with a solid understanding of DevOps practices and deeper experiences with Linux SBC's and Microcontrollers, I took the lead here.

<div style="display: flex; justify-content: center; align-items: center; gap: 2rem; margin: 2rem 0; flex-wrap: wrap;">
  <img src="/logos/linux.svg" alt="Linux" style="height: 48px; width: auto;" />
  <img src="/logos/python.svg" alt="Python" style="height: 48px; width: auto;" />
  <img src="/logos/cpp.svg" alt="C++" style="height: 48px; width: auto;" />
  <img src="/logos/raspberrypi.svg" alt="Raspberry Pi" style="height: 48px; width: auto;" />
   <img src="/logos/Arduino.svg" alt="Arduino" style="height: 48px; width: auto;" />
    <img src="/logos/Git.svg" alt="Git" style="height: 48px; width: auto;" />
</div>

The primary difficulty with the challenge this year, was related to how we get multiple independent systems to communicate with one another, without sacrificing mission capabilities. To this end, I'll start with introducing the chosen hardware:

- Libre Computer Le Potato (Linux Single Board Computer)
- 2x ESP32-C Dev Board V1 (RISC-V Series Microcontroller)
- RYLR998 (Long Range Transmitter Solution)
- AliBaba Soil Sensor (evil soil sensor with no documentation)
- MPL3115A2 (Altimeter)

The concept of operations for the software is complex, yet functional. For the purposes of explanation there are 3 fundmental systems interplaying with one another. The first is the base station, which acts as the command bridge, and the initiator of various states onboard the payload and LV respectively. The second is the nose cone electronics bay, which acts as the manual seperation point for the payload and the LV (as per NASA requirements), and finally the payload itself which hosts a variety of sensors and technology to perform its tasks.

I will break down each of the subsystems independently of one another, to best come to an understanding of the finer elements of each.

### Base Station

The base station for the project, can be boiled down to a microcontroller connected to a LoRa transmitter via SPI, while simulatenously being connected over serial to a laptop for active telemetry. The following code block shows how we intialize the LoRa module - this code struture is recurrent across the project - the RYLR998 relies on AT+ commands to write to its flash memory - and this is how we address various requirements around wireless communication (most notably, the frequency requirement from NASA for 914.5 mHz). This AT Command structure is also how we differentiate between various boards and operating systems. The transmitter itself needs to specify a network address as well as a hardware address. In essence, the network address is what allows for the board to identify other boards in the network, and the hardware address is how you choose what board you want to communicate with.This effectively makes the host operating system or programming of the reciever irrelevant as the transmitter structure itself handles the communication and all a developer needs to do is handle piping the information away from the transmitter.

```cpp
void setup() {
  Serial.begin(115200);

  delay(3000);
  Serial.println();
  Serial.println("----------------------------------------");
  Serial.println("   BASE STATION STARTING...");
  Serial.println("----------------------------------------");

  // Start LoRa Serial
  LoRaSerial.begin(115200, SERIAL_8N1, RX_PIN, TX_PIN);

  // Reset LoRa Module
  pinMode(RST_PIN, OUTPUT);
  digitalWrite(RST_PIN, HIGH); delay(100);
  digitalWrite(RST_PIN, LOW);  delay(100);
  digitalWrite(RST_PIN, HIGH); delay(1000);

  // Configure LoRa
  sendATCommand("AT");
  delay(500);
  sendATCommand("AT+BAND=914500000"); // 914.5 MHz per NASA requirements
  delay(500);
  sendATCommand("AT+ADDRESS=" + String(LOCAL_ADDRESS));
  delay(500);
  sendATCommand("AT+NETWORKID=" + String(NETWORK_ID));
  delay(500);

  printMenu();
}
```
From there, we begin uncovering the mission flow. Each of the three systems, from base station, nose cone bay, and payload - operates in different modes depending on what's happening during the mission. For example, the payload isn't doing anything while the rocket is in flight, but once it's on the ground and receives the right command, it kicks into action. These modes (or "states") and the events that trigger them are what drive the entire software architecture, so understanding that concept is crucial to developing an understanding of what the base station is actually "doing". A critical aspect of what NASA enforces is accountability and manual action - and therefore they heavily warn against automatic state transitions due to the risk of a untimely transition causing an accident. The base station in this acts as the absolute authority over the other two systems involved in this mission, and determines whether or not they transition or not. 

```cpp
void printMenu() {
  Serial.println();
  Serial.println("----------------------------------------");
  Serial.println("   SYSTEM READY");
  Serial.println("   Type '1' for Separation Command (Board 3)");
  Serial.println("   Type '2' for Initialize Payload  (Board 4)");
  Serial.println("   Type '3' to Enter Telemetry Listener Mode");
  Serial.println("----------------------------------------");
}
```
As can be seen above this is how we differentiate different states for the base station - there are more internal to each system to consider, and we'll go over those as we approach those subsystems.

Lastly - I wanted to cover the actual process of sending messages and what that looks like from a data perspective.

```cpp
// -----------------------------------------------------------------------
// Parses incoming sensor packet from Board 3
// Expected payload format: "ALT:xxx.xx,PRES:xxxxx.xx,TEMP:xx.xx"
// Full RCV format: +RCV=<SenderID>,<Len>,<Data>,<RSSI>,<SNR>
// -----------------------------------------------------------------------
void parseSensorPacket(String raw) {
  String body = raw.substring(5);

  int firstComma  = body.indexOf(',');
  int secondComma = body.indexOf(',', firstComma + 1);
  int lastComma   = body.lastIndexOf(',');
  int secondLast  = body.lastIndexOf(',', lastComma - 1);

  if (firstComma < 0 || secondComma < 0 || lastComma < 0 || secondLast < 0) {
    Serial.print("[RAW PACKET]: ");
    Serial.println(raw);
    return;
  }

  String senderID = body.substring(0, firstComma);
  String payload  = body.substring(secondComma + 1, secondLast);
  String rssi     = body.substring(secondLast + 1, lastComma);
  String snr      = body.substring(lastComma + 1);

  float altitude    = extractValue(payload, "ALT:");
  float pressure    = extractValue(payload, "PRES:");
  float temperature = extractValue(payload, "TEMP:");

  Serial.println();
  Serial.println("--- TELEMETRY FROM BOARD " + senderID + " ---");
  Serial.print("   Altitude    : "); Serial.print(altitude,    2); Serial.println(" m");
  Serial.print("   Pressure    : "); Serial.print(pressure,    2); Serial.println(" Pa");
  Serial.print("   Temperature : "); Serial.print(temperature, 2); Serial.println(" C");
  Serial.print("   RSSI        : "); Serial.print(rssi);           Serial.println(" dBm");
  Serial.print("   SNR         : "); Serial.print(snr);            Serial.println(" dB");
  Serial.println("-------------------------------");}
```

This portion of the software does the parsing needed to make the stream of data coming into the software readable by a ground operator. Its crucial to make it as readable as possible to ensure that the operator (regardless of technical background) can interpret the results and make decisions. We use the parseSensorPacket function to grab the data, and then translate it to human ready language.

### Nose Cone Electronics Bay



### Payload

### Technical Challenges (of all kinds)

### Did it pay off?

