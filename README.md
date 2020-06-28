# STEGANOGRAPHER

Steganographer is a web application that provides fast and reliable use of steganography online. The web app is hosted on [Heroku](https://steganographer.herokuapp.com/home) server.

## Technical details

The web app is developed using MEAN stack (MongoDB, Express, AngularJS, NodeJS). This application allows automatic text encryption and encoding within the image. For the text encryption, the Advanced Encryption Standard (AES) is utilised. Steganography part is implemented using a Least Significant Bit (LSB) replacement method. It is worth noting that image pre-processing and LSB interchange is only applied to the part of the image where the encrypted message is located. Both start and end of the encrypted message within the image are marked with "START" and "STOP" flags.

## Security
The application is built with security measures in mind. The application is resistant to XSS and NoSQL injection attacks. Both front-end and back-end user input validations are present and tested. Additionally, any packets sent between front-end (client) and back-end (server) are automatically encrypted due to the use of TLS protocol, which ensures safe data transfer over the network.

## Third party content
This application is utilising a [MongoDB](https://www.mongodb.com/cloud/atlas) Atlas cloud database for user data storage and an external image API service called [Lorem Picsum](https://picsum.photos/) for random stock images retrieval. The application is developed with help of Bootstrap and W3.CSS frameworks, text encryption is implemented using [CryptoJS](https://github.com/brix/crypto-js) library.
