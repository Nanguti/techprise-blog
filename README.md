# Next.js TypeScript Blog with Tailwind CSS and NEXTAUTH

This project is a simple blog built using Next.js with TypeScript and styled with Tailwind CSS. It includes features such as a blog home page, individual blog post pages, user registration and login functionality with NEXTAUTH, user post creation and update capabilities, and the ability to add user images from Google.

## Features

1. **Blog Home Page:**

   - Displays a list of blog posts with titles, publication dates, and brief excerpts.
   - Styled using Tailwind CSS.

2. **Blog Post Page:**

   - Implements dynamic routing for individual blog posts (e.g., `/posts/[slug]`).
   - Displays the full content of a blog post.
   - Includes a back button to navigate back to the homepage.
   - Styled using Tailwind CSS.

3. **User Authentication and Authorization:**

   - Utilizes NEXTAUTH for user registration and login functionality.
   - Logged-in users are able to create and update their posts.
   - User images can be added from Google.

4. **Blog Data:**

   - Utilizes MongoDB to store blog data.
   - Utilizes the power of Next.js to create APIs to handle data storage and manipulation.

5. **Responsive Design:**
   - Utilizes Tailwind CSS classes for responsiveness.

## Setup Instructions

1. **Clone the Repository:**

Clone the repo, cd into the project and run development server

    ```bash
    git clone https://github.com/Nanguti/techprise-blog.git
    cd techprise-blog
    ```

2. **Install dependencies and run development server**

   ```bash
   npm install
   npm run dev
   ```

3. **Set Environment Variables:**
   Create a `.env.local` file in the root directory and add the following environment variables:

   ```bash
   MONGODB_URI=<your-mongodb-uri>
   NEXTAUTH_URL=http://localhost:3000/
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   ```

   Visit Google Cloud Console[Google Cloud Console](https://console.cloud.google.com/) to set, `GOOGLE_CLIENT_ID=<your-google-client-id>`, and
   `GOOGLE_CLIENT_SECRET=<your-google-client-secret>`. This setup will enable you to login using google account.

4. **Start the Development Server:**

   ```bash
   npm run dev
   ```

5. **View the Application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy on Vercel

Check out delopyed version on vercel [Techprise Blog](https://techprise-blog.vercel.app/)
