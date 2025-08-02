# CreativeStatus Bot User Guide

Welcome to the CreativeStatus Bot! This bot helps creative professionals manage and share their profiles directly within Discord. You can set your profession, portfolio link, and list your skills, making it easier for others to discover your talents.

## Available Commands

### 1. `/ping`

*   **Description:** Replies with 'Pong!'. Use this command to check if the bot is online and responsive.
*   **Usage:** `/ping`

### 2. `/profile`

*   **Description:** Manage your professional profile.

#### Subcommand: `/profile set`

*   **Description:** Set or update your professional profile details.
*   **Options:**
    *   `profession` (Optional): Your primary profession (e.g., Illustrator, Web Developer).
        *   **Example:** `profession:DigitalArtist`
    *   `portfolio` (Optional): Link to your online portfolio/website.
        *   **Example:** `portfolio:https://myart.com/gallery`
    *   `skills` (Optional): A comma-separated list of your skills (e.g., Photoshop, Node.js, UI/UX).
        *   **Example:** `skills:Procreate,ClipStudioPaint,ConceptArt`
*   **Usage:** `/profile set profession:your_profession portfolio:your_link skills:skill1,skill2`
    *   *You can provide one, multiple, or all options.*

#### Subcommand: `/profile view`

*   **Description:** View your own or another user's professional profile.
*   **Options:**
    *   `user` (Optional): The user whose profile you want to view. If left empty, it will show your own profile.
        *   **Example:** `user:@AnotherUser`
*   **Usage:**
    *   To view your own profile: `/profile view`
    *   To view another user's profile: `/profile view user:@AnotherUser`

