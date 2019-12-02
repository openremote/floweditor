# OpenRemote Flow Editor

This project is a user interface for creating OpenRemote Flow rules using a drag-and-drop node system.

## Running the application

Make sure your environment is configured correctly by [following this guide.](https://github.com/openremote/openremote/wiki/Developer-Guide%3A-Preparing-the-environment)

After everything is set up correctly, start the keycloak service by navigating to the ``openremote`` submodule and running ``docker-compose -f /profile/dev-testing.yml up -d``. In the same directory, run ``gradlew gwtSuperDev`` to be able to open the manager. Make sure all components in both ``./openremote/ui/component/`` and ``./ui/component/`` directories are built. 

Run the manager by following [following this guide](https://github.com/openremote/openremote/wiki/Developer-Guide%3A-Setting-up-an-IDE). Navigate to ``./ui/app/flow-editor`` and run ``yarn build && yarn serve`` to launch the application. Navigate to ``localhost:1234`` in Chrome or Firefox to use it.

## Using the application

Flow rules are generally used to define virtual attributes or link existing attributes. However, it can also be used to create normal condition-action rules that process data. When you launch the editor you will be greeted with a large open space and a list of nodes. You can add nodes by drag-and-dropping them from the node panel into the workspace. To indicate data flow, you connect sockets from different nodes to each other.

A flow rule usually consists of three parts: the input, the processing, and the output. The input side is blue and retrieves data from external sources such as the user or the Manager. The data then optionally flows through the processing part. This part is coloured green and typically does not interact with the outside world and only manipulates the data given by the input side. Data always ends up in the output side, coloured purple. This side receives data from the rest of the flow and sends it to external destinations (usually the Manager). Flow rules are executed when asset attributes given in the input side have changed.

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
