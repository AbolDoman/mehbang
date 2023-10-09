how to work:
The project includes the header section, where the logo and a default menu are located in the middle. 
The main page contains a table with a list of employees, each line containing the name, age, id, and salary of the individual along with buttons for updating and see more.
There is a button on the bottom and right side of the page to add a new employee, by clicking on it, the side drawer opens and a new member can be created. Also, in this drawer, after clicking on the add button, the necessary checks are added until the values  entered is correct and then the request is sent to the api.
Errors and warnings are displayed by an alert. MUI has also been used to design the pages, and Tailwind has been used to apply the required styles.
Error number 429 is displayed with appropriate message to try again.
and It is used from the context to state management.

envirement variables: 
Inside the .env file, there are two variables, MODE is for production mode and BASE_URL is for the base address of APIs.

design patterns: 
Several design patterns have been used in combination, including:
1-container/component
2-inheritance
3-render props
4-centralized state management

Good luck