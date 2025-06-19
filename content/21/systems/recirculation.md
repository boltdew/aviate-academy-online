
---
title: "Recirculating System"
difficulty: "Intermediate"
duration: 35
description: "Aircraft cabin air recirculation system operations and controls"
tags: ["air-conditioning", "recirculation", "cabin-air", "ventilation"]
author: "AeroLearn Team"
lastUpdated: "2024-01-15"
---

# Recirculating System

## Overview

The Recirculating System puts cabin air back into the Air Conditioning Distribution System, providing efficient air circulation throughout the aircraft cabin.

## System Control

### Primary Control
- **Right Cabin Temperature Controller (CTC)**: Supplies usual control for all Recirculation Fans
- **Left CTC**: Provides backup control functionality

### Monitoring Systems
- **Left and Right ECSMC's**: Monitor for fan overheat conditions
- **ELMS**: Controls power to the fans

## Overheat Protection

### Overheat Detection
When an overheat switch opens:
1. The ECSMC sends an overheat signal to the CTC
2. The CTC latches the fan OFF automatically
3. System protects against thermal damage

### Overheat Recovery
If a fan latches OFF due to overheat conditions:
- Cycle the **Recirculation Fan Switch** from OFF to ON
- This action releases the latch and allows fan restart
- Ensure overheat condition has cleared before restart

## Normal Operation

### Standard Operating Conditions
- **Upper and Lower Fans**: Operate continuously on ground and in flight
- **Single Pack Ground Operation**: With high ambient temperature, lower fan may stop automatically
- **Continuous Operation**: Maintains consistent cabin air circulation

### Operating Environment
- Ground operations: Both fans typically running
- Flight operations: Continuous operation maintained
- High temperature conditions: System may modify fan operation

## Non-Normal Operation

### Cargo Fire Arm Conditions
When forward or aft **Cargo Fire Arm Switch** is in Armed Position:
- ELMS and CTC automatically turn OFF lower fans
- Safety protocol prevents potential fire spread
- Upper fans may continue operation

### Pack Schedule Compensation
If Upper or Lower Fan failure occurs with **Pack Schedule 1** in effect:
- Pack flow rate automatically increases
- Maintains total cabin ventilation rate constant
- System compensates for reduced recirculation

## Bulk Cargo Ventilation

### Fan Operation
- **Function**: Increases ventilation to bulk cargo compartment
- **Air Flow**: Pulls air from passenger compartment to bulk cargo area
- **Activation**: Operates when Bulk Cargo Heating System is set to HIGH

### System Integration
- Coordinates with heating system
- Ensures proper cargo compartment environment
- Maintains air circulation in cargo areas

## Lavatory/Galley Ventilation

### Dual Fan Configuration
- **Two fans installed**: Only one operates at a time
- **Right Fan**: Primary operation
- **Left Fan**: Backup operation

### Power-Up Sequence
1. **Left Fan**: Comes on first at power-up
2. **Testing Phase**: Left fan is tested automatically
3. **Shutdown**: Left fan goes off after successful test
4. **Right Fan Activation**: Comes on and is tested
5. **Normal Operation**: Right fan continues operating

### Air Sources
The ventilation fan pulls air from:
- **Lavatories**: Passenger and crew facilities
- **Galleys**: Food preparation areas
- **Zone Temperature Sensors**: Environmental monitoring points
- **Cargo Temperature Sensors**: Cargo compartment monitoring
- **Electrical and Electronic Equipment**: Equipment cooling

## System Monitoring

### Temperature Control
- Continuous monitoring of compartment temperatures
- Integration with environmental control systems
- Automatic adjustment based on conditions

### Equipment Protection
- Electrical equipment cooling
- Electronic systems ventilation
- Prevention of equipment overheating

## Maintenance Considerations

### Regular Inspections
- Fan operation verification
- Overheat switch functionality
- Control system responsiveness
- Air flow measurements

### Troubleshooting Points
- Fan latch conditions
- Overheat signal verification
- Control system communication
- Power supply integrity

## Safety Notes

⚠️ **Important Safety Information:**
- Always verify overheat conditions are cleared before fan restart
- Monitor cargo fire arm switch positions during maintenance
- Follow proper lockout/tagout procedures
- Ensure proper ventilation during system testing
