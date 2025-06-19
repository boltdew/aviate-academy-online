
---
title: "Tank Vent System and Fuel Indication"
difficulty: "Intermediate"
duration: 40
description: "Aircraft fuel tank vent system operations and fuel indication systems"
tags: ["fuel", "tank-vent", "indication", "pressure-relief", "FQIS"]
author: "AeroLearn Team"
lastUpdated: "2024-01-15"
---

# Tank Vent System and Fuel Indication

## Tank Vent System

### Overview
The Tank Vent System keeps the pressure of the fuel tanks near the pressure of the outside atmosphere. A large pressure difference can damage the wing structure.

### System Operation
Vent channels and vent tubes keep the pressure of all fuel tanks near the pressure in the surge tanks. The surge tanks are open to outside air through the vent scoops.

### Vent Scoop Design
The shape of the vent scoops maintains positive pressure inside the surge tanks during flight, ensuring proper ventilation and pressure equalization.

### Fuel Vent Float Valves
- **High Fuel Level**: When fuel level is higher than the outboard end of the main tank vent tube channels, the fuel vent float valves close to keep fuel out of the vent channels
- **Low Fuel Level**: When fuel level is below these valves, the floats open them to allow proper venting

### Pressure Relief Valve
- **Normal Operation**: The pressure relief valve is normally closed
- **Abnormal Indication**: An open pressure relief valve is a symptom of a blocked vent scoop or flame arrestor

## Fuel Indication System

### System Components
The indication system consists of these subsystems:
- Fuel Quantity Indication System (FQIS)
- Fuel Measuring Sticks
- Fuel Temperature Indication
- Fuel Pressure Indication

## Fuel Quantity Indication System (FQIS)

### Primary Functions
- **Volume Measurement**: Measures the fuel volume in tanks
- **Quantity Calculation**: Calculates the total fuel quantity
- **Refuel Control**: Controls refuel operations
- **Water Detection**: Shows when there is water in the tanks

### Data Communication
- **IRP Interface**: Fuel weights are transmitted to the Integrated Refuel Panel (IRP) via ARINC 429
- **AIMS Interface**: Fuel weights, FQIS data, and fault information are sent to the Aircraft Information Management System (AIMS) on the System ARINC 629 buses

## System Components

### Densitometers
- **Installation**: Each fuel tank has one densitometer
- **Technology**: Uses a vibration cylinder transducer to measure fuel density in each tank
- **Purpose**: Provides accurate density measurements for fuel quantity calculations

### Water Detectors
- **Function**: The Fuel Quantity Processor Unit (FQPU) uses water detector signals to detect water in the tank sump area
- **Installation**: Each fuel tank has one water detector
- **Indication**: The Fuel Quantity Maintenance Page displays a message when water is detected in the fuel tank

### Temperature Sensor
- **Installation**: Only one fuel temperature sensor is installed
- **Location**: Measures fuel temperature in the left main tank
- **Type**: Resistance-type sensor that fits inside a protective sleeve

## Overfill Protection

### Surge Tank Float Switch
- **Installation**: Each surge tank contains a surge tank float switch
- **Operation**: When fuel enters the surge tank, the float switch activates
- **Signal Path**: Float switch sends a signal through the IRP to the Electrical Load Management System (ELMS)
- **Protection Action**: ELMS removes power from all refuel valves, causing them to close and preventing overfill

### Safety Features
- **Automatic Shutoff**: System automatically prevents tank overfilling
- **Redundant Protection**: Multiple sensors and switches provide backup protection
- **Rapid Response**: Immediate valve closure upon detection of overfill conditions

## System Integration

### Electronic Interface
- **ARINC 429**: Digital data bus for fuel weight transmission
- **ARINC 629**: System data bus for comprehensive fuel system information
- **ELMS Integration**: Electrical load management for valve control

### Maintenance Considerations
- **Regular Inspection**: Float valves and vent systems require periodic inspection
- **Water Detection**: Monitor fuel quality maintenance pages for water contamination
- **Pressure Relief**: Verify proper operation of pressure relief valves
- **Density Calibration**: Ensure densitometer accuracy for fuel calculations

## Troubleshooting

### Common Issues
- **Blocked Vent Scoop**: Results in open pressure relief valve
- **Float Valve Malfunction**: Can cause fuel contamination of vent system
- **Water Contamination**: Detected through water detector system
- **Pressure Imbalance**: May indicate vent system blockage

### Diagnostic Procedures
- **Pressure Testing**: Verify tank pressure equalization
- **Float Valve Operation**: Test float valve opening and closing
- **Water Detection Test**: Verify water detector functionality
- **Vent System Inspection**: Check for blockages or damage

## Safety Notes

⚠️ **Important Safety Information:**
- Always monitor fuel tank pressures during operations
- Investigate any open pressure relief valve immediately
- Follow proper fuel handling procedures during maintenance
- Ensure vent systems are clear before fuel operations
- Verify water detection system functionality regularly
