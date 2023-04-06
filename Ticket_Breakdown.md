# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

## Ticket 1: Add Custom ID Column to Agents Table

### Description

Currently, the reports generated for Facilities display the internal database id of each Agent. We need to add a new column to the Agents table in the database to store a custom id that Facilities can assign to each Agent.

### Acceptance Criteria

- A new column called `custom_id` has been added to the Agents table in the database.
- The custom_id is unique for each Agent within a Facility.
- The custom_id is editable by Facilities.
- The custom_id is used in place of the internal database id on all reports generated for Facilities.

### Implementation Details

- A new migration should be created to add the `custom_id` column to the Agents table.
- A new API endpoint should be created to allow Facilities to update the `custom_id` for an Agent.
- The `generateReport` function should be updated to use the custom_id instead of the internal database id when generating reports.
- Unit tests should be added for the new migration, API endpoint, and updated `generateReport` function.

### Time/Effort Estimate

- Migration: 1 hour
- API Endpoint: 3 hours
- Update `generateReport` function: 2 hours
- Unit Tests: 2 hours
- Total: 8 hours

## Ticket 2: Add Custom ID Input Field to Agent Form

### Description

We need to add a new input field to the Agent form in the Facilities interface where they can enter a custom id for the Agent.

### Acceptance Criteria

- A new input field for `custom_id` has been added to the Agent form in the Facilities interface.
- The `custom_id` input field is required.
- The `custom_id` input field is unique for each Agent within a Facility.

### Implementation Details

- A new input field should be added to the Agent form in the Facilities interface.
- The input field should be validated to ensure it is unique for each Agent within a Facility.

### Time/Effort Estimate

- Frontend: 2 hours
- Backend: 1 hour
- Unit Tests: 1 hour
- Total: 4 hours

## Ticket 3: Update getShiftsByFacility Function to Include Custom IDs

### Description

We need to update the `getShiftsByFacility` function to include the custom_id for each Agent in the response.

### Acceptance Criteria

- The `getShiftsByFacility` function returns all Shifts worked by the Facility for the given quarter, including the custom_id for each Agent assigned to a Shift.

### Implementation Details

- The `getShiftsByFacility` function should be updated to join the Agents table to the Shifts table and include the `custom_id` column in the response.

### Time/Effort Estimate

- Backend: 2 hours
- Unit Tests: 1 hour
- Total: 3 hours

## Ticket 4: Update `generateReport` Function to Use Custom IDs

### Description

We need to update the `generateReport` function to use the custom_id for each Agent in the reports generated for Facilities.

### Acceptance Criteria

- The `generateReport` function uses the custom_id for each Agent in the reports generated for Facilities.

### Implementation Details

- The `generateReport` function should be updated to use the `custom_id` column instead of the internal database id when generating reports.

### Time/Effort Estimate

- Backend: 2 hours
- Unit Tests: 1 hour
- Total: 3 hours

## Ticket 5: Update Existing Reports with Custom IDs

### Description

When a Facility updates the custom ID for an Agent, all previously generated reports must be updated to use the new custom ID instead of the internal database ID.

### Acceptance Criteria

- When a Facility updates the custom ID for an Agent, all previous reports for that Agent must use the new custom ID.
- Reports for Agents who have not had their custom ID updated should continue to use the internal database ID.
- The update should be performed efficiently to avoid impacting the performance of the platform.

### Implementation Details

- A new field will need to be added to the database to store the custom ID for each Agent.
- When generating a report, if a custom ID exists for an Agent, it should be used instead of the internal database ID.
- A script should be created to update all previously generated reports with the new custom ID.
- The script should be run in the background to avoid impacting the performance of the platform.
- The script should be designed to handle errors and avoid generating duplicate reports.

### Unit Testing

- Unit tests should be created to ensure that previously generated reports are updated correctly when an Agent's custom ID is updated.
- Tests should be created to verify that reports for Agents who have not had their custom ID updated continue to use the internal database ID.
- Tests should be created to ensure that the script to update previously generated reports works correctly and efficiently.

### Time/Effort Estimate

- Adding the new field to the database: 2 hours
- Updating the report generation code: 4 hours
- Creating the update script: 6 hours
- Writing unit tests: 4 hours
- Total: 16 hours
