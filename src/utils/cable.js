// src/utils/cable.js
import { createConsumer } from "@rails/actioncable";

const cable = createConsumer("http://localhost:3000/cable"); // Replace with your backend URL

export default cable;
