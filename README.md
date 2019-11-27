# OpenRemote Flow Editor

This project is a user interface for creating OpenRemote Flow rules using a drag-and-drop node system.

## Running the application

*Describe how to run the application once finishing [this task](https://github.com/openremote/floweditor/projects/1#card-29775819)*

## Using the application

Flow rules are generally used to define virtual attributes or link existing attributes. However, it can also be used to create normal rules. When you launch the editor you will be greeted with a large open space and a list of nodes. You can add nodes by drag-and-dropping them from the node panel into the workspace. To indicate data flow, you connect sockets from different nodes to each other.

A flow rule usually consists of three parts: the input, the processing, and the output. The input side is blue and retrieves data from external sources such as the user or the Manager. The data then optionally flows through the processing part. This part is coloured green and typically does not interact with the outside world and only manipulates the data given by the input side. Data always ends up in the output side, coloured purple. This side receives data from the rest of the flow and sends it to external destinations (usually the Manager).

Nodes are the functional parts of a flow rule. They in- and output data through their sockets. A node socket can be one of these data types:
 - Number (green)
 - String (cyan)
 - Boolean (blue)
 - Any (purple)

A socket can only be connected to a socket with the same data type, unless either one of them is of type "Any". Sockets with the "Any" type can be connected by and to any other socket. Connections between sockets define the data flow of the rule. In other words, connections decide where the given information ends up.

### Examples

![Attribute linking example](https://i.imgur.com/h9oycJt.png)

*This flow one-way links the living room lights with the bathroom lights.*

----
![Virtual attribute definition example](https://i.imgur.com/q2cr3Pv.png)

*This flow defines the "average temperature" virtual attribute, which is the average temperature of all rooms in the apartment*

----
![Simple processing example](https://i.imgur.com/kvVNA8s.png)

*This flow sets the living room target temperature to half the bedroom target temperature*

----


