# IPFSProVault

## Overview

**IPFSProVault** is a robust and secure decentralized application for uploading and retrieving images on IPFS. This application is integrated with smart contracts for storing IPFS hashes, leveraging the IPFS network for decentralized file storage. To ensure data privacy and security, the files are encrypted before uploading. The system utilizes **Pinata SDK** for efficient file pinning, ensuring file persistence on the IPFS network.

This project implements a crypted IPFS vault using the **MERN** stack (MongoDB, Express.js, React.js, Node.js) along with blockchain technology. The vault allows users to securely store files on the IPFS network, encrypting the data and managing access through **blockchain-based** and **JWT authentication**.

## Features

- **Blockchain-based Authentication**: Users are authenticated using blockchain technology, enhancing the security and immutability of user identity.
- **Encrypted File Upload**: Upload encrypted files to the IPFS network. The file data is encrypted before it is sent to IPFS for added security.
- **Blockchain Smart Contracts**: Store encrypted IPFS hashes on a smart contract, ensuring secure and verifiable access to files.
- **Efficient File Pinning**: Pinata SDK is used to pin files on IPFS, ensuring they remain accessible and persistent.
- **User-friendly Interface**: A React.js-based interface enables users to easily upload, view, and manage their files in a seamless web application experience.
- **File Management**: View and manage uploaded files within the web interface. Users can easily retrieve their encrypted files based on their secure IPFS hashes.

## Technologies Used

- **MongoDB**: A NoSQL database used to store user data and encryption keys securely.
- **Express.js**: A web application framework for Node.js, used to handle server-side logic and routing.
- **React.js**: A JavaScript library for building user interfaces, providing a seamless front-end experience.
- **Node.js**: A JavaScript runtime environment that powers the backend of the application.
- **IPFS (InterPlanetary File System)**: A decentralized peer-to-peer file storage system used to store encrypted files securely.
- **Pinata SDK**: Used for efficient and reliable file pinning on IPFS to ensure file persistence.
- **Blockchain**: Utilized for user authentication and storing file metadata securely on the blockchain.
- **JWT (JSON Web Tokens)**: Used for user authentication and secure token-based sessions.

## Installation

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/IPFSProVault.git
   cd IPFSProVault
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

4. **Run the application:**
   ```bash
   npm start
   ```

5. **Access the application**: 
   Open `http://localhost:3000` in your browser to access the web application.

