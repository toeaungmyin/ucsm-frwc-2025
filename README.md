# UCSM Fresher Welcome Voting App

## Overview
The UCSM Fresher Welcome Voting App is a web application designed for the University of Computer Studies, Mandalay. It allows users to vote for their favorite candidates in various categories during the fresher welcome event.

## Features
- **Candidate Management**: Add, update, and delete candidates.
- **Voter Management**: Generate and manage voters.
- **Voting System**: Cast votes for candidates in different categories.
- **PDF Export**: Export voter verification tickets with QR codes.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Project Structure
```
.env
.eslintrc.json
.gitignore
.next/
app/
components/
hooks/
lib/
prisma/
public/
```

## Database
The application uses PostgreSQL as the database, managed by Vercel Postgres. The Prisma ORM is used to interact with the database.

### Schema
```prisma
model Voter {
  id             String   @id @default(uuid())
  serial         String   @unique
  votes          Vote[]
  createdAt      DateTime @default(now())
}

model Candidate {
  id         Int      @id @default(autoincrement())
  nomineeId  String
  name       String
  category   Category
  image      String?
  votes      Vote[]
  createdAt  DateTime @default(now())
}

model Vote {
  id          Int       @id @default(autoincrement())
  voterId     String
  candidateId Int
  createdAt   DateTime  @default(now())

  voter       Voter     @relation(fields: [voterId], references: [id])
  candidate   Candidate @relation(fields: [candidateId], references: [id])

  @@unique([voterId, candidateId])
}

enum Category {
  KING
  QUEEN
  PRINCE
  PRINCESS
  BEST_SINGER
  BEST_PERFORMANCE
}

model Setting {
  id         Int      @id @default(autoincrement())
  curr_index Int      @default(0)
  vote_open  Boolean  @default(false)
}
```

## Services

### Vercel Hosting
The application is hosted on Vercel, providing seamless deployment and scalability.

### Vercel Postgres
The PostgreSQL database is managed by Vercel Postgres, ensuring reliable and scalable database management.

### Vercel Blob
Vercel Blob is used for storing and managing images associated with candidates.

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/toeaungmyin/ucsm-frwc-2025.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in [`.env`](.env ) file:
   ```env
   DATABASE_URL=your_database_url
   ```

### Running the Application
1. Run the development server:
   ```sh
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000`.

### Deployment
1. Deploy the application to Vercel:
   ```sh
   vercel
   ```

## License
This project is licensed under the MIT License. See the [`LICENSE`](LICENSE ) file for details.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Contact
For any inquiries, please contact Toe Aung Myin at [toeaungmyin.official@gmail.com](mailto:toeaungmyin.official@gmail.com).
