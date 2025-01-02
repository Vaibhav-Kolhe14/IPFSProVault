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

1. **Clone the Repository**:  
   ```bash  
   git clone https://github.com/Vaibhav-Kolhe14/IPFSProVault.git  
   ```  

2. **Navigate to the Project Directory**:  
   ```bash  
   cd IPFSProVault  
   ```  

3. **Install Dependencies for Backend and Frontend**:  
   - Navigate to the `backend` directory and install dependencies:  
     ```bash  
     cd backend  
     npm install  
     ```  
   - Navigate to the `frontend` directory and install dependencies:  
     ```bash  
     cd ../frontend  
     npm install  
     ```  

4. **Deploy Smart Contracts Using Remix IDE**:  
   - Open [Remix IDE](https://remix.ethereum.org/).  
   - Create a new Solidity contract or upload the existing smart contract file from this repository.  
   - Compile the smart contract using the Solidity compiler in Remix.  
   - Deploy the contract to a test network or Ethereum mainnet using Remix's "Deploy & Run Transactions" plugin, connected to your MetaMask wallet.  

5. **Run the Application**:  
   - Start the backend server:  
     ```bash  
     cd ../backend  
     npm start  
     ```  
   - Start the frontend development server:  
     ```bash  
     cd ../frontend  
     npm run dev  
     ```
     
6. **Connect with MetaMask**:
   Ensure MetaMask is connected to your local blockchain or test network and that the account has sufficient tokens for voting.


> Thank you for checking out my project! 

