# Parkit: Solving Urban Parking Challenges 🚗
## 🚩 Problem Statement
Urban areas are facing an ever-growing challenge of parking shortages, congestion, and inefficient use of available parking spaces.
As cities expand, the demand for parking spots increases, leading to frustration for drivers, wasted time, and unnecessary fuel consumption while searching for available spots. Similarly, businesses and property owners often have unused parking spaces that could be monetized but lack an efficient platform to connect with drivers in need.

<h3>Key Challenges:</h3>

For users (drivers):
Difficulty in finding available parking spaces, especially during peak hours.
Wasting time and fuel driving around searching for spots.
Lack of transparency regarding parking availability and prices.
For providers (parking space owners):
Inability to optimize and monetize underutilized parking spaces.
Lack of a streamlined system for managing spot availability and user bookings.
There is a clear need for a solution that bridges the gap between drivers looking for parking and providers offering available spaces.

### Our Solution:
Parkit bridges the gap between drivers looking for parking and providers offering available spaces by offering a streamlined, user-friendly platform for both parties.

## 🛠️ Tech Stack

- **Frontend/Backend Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Supabase](https://supabase.com/)
- **Styling**: [Aceternity UI](https://aceternity.com/), [Framer Motion](https://www.framer.com/motion/), [Tailwind CSS](https://tailwindcss.com/)
- **Maps**: [MapBox](https://www.mapbox.com/)
- **Deployment**: [Vercel](https://vercel.com/) (Perfect for Next.js apps)
- **Payment**:[Razorpay](https://razorpay.com/)

# Functional Requirements

## 👥 User Types:
1. **🚗 Users**: People searching for parking spots.
2. **🏢 Hosts**: Malls, apartments, or other establishments providing parking spaces.

---

## 🔑 Key Features:

### User-side:
- 🔍 **Search** for parking spots based on location.
- 📅 **Book** available parking spots for a specific duration.
- 🏷️ **Generate a QR code** for entry.
- 💳 After finishing, **scan a QR code** for payment and exit.

### Host-side:
- 🌐 **Share** parking spot location and availability to earn revenue.

---

## ⚙️ System Features:

- ⏱️ **Time-based parking**: Users can select specific parking durations.
- 💰 **Payments**: Process parking fees via QR code scanning.
- 📊 **Real-time availability**: Show current parking spot availability.
- 🏷️ **QR Code System**: Use a **QR code** to manage parking entry, exit, and payments.
.

# 🌍 Why Mapbox over Google API?

We initially started with **Google Maps**, but encountered payment issues that took many hours to resolve. This led us to explore alternatives, and ultimately we chose **Mapbox** due to its flexibility and more straightforward pricing model. It provides similar features, with easier implementation and better cost control for our needs.

---

# 🗄️ Why Supabase?

**Supabase** is built on **PostgreSQL**, a powerful relational database. It supports structured data, relationships (foreign keys, constraints), and SQL querying. This made it an ideal choice for our app, which relies on structured parking data with user relationships. Its simplicity and scalability align perfectly with our project’s needs.

---

# ⚔️ NEXT.js vs MERN: The Million-Dollar Question

We had experience with both **MERN** and **NEXT.js** and were initially torn between the two. Here's why we went with **NEXT.js**:
- 🛤️ **Routing**: Built-in routing simplifies the development process.
- ⚙️ **API handling**: Managing APIs is more seamless.
- 🖥️ **Server-Side Rendering (SSR)**: NEXT.js provides better performance with SSR.
- 💻 **Unified frontend and backend**: NEXT.js brings both under one roof, enhancing development speed and efficiency.
- 🎨 **Shadcn UI**: Integration with modern UI frameworks made it a clear choice.

NEXT.js offered everything we needed, from SSR to smooth API handling, giving us the optimal framework to build Parkit.

---

# 📏 Haversine Formula vs Google Distance API

While we could have used the **Google Directions API** to calculate the shortest distance between users and parking lots, we opted for the **Haversine formula**. It’s a mathematical approach that delivers the same result with less complexity.

### The Haversine Formula:
The Haversine formula calculates the shortest distance between two points on Earth using their latitude and longitude. It computes the "great-circle" distance, which is the shortest path between two points on the surface of a sphere (like Earth).

**Formula**:
\[
d = 6371 \cdot \arccos\left( \sin(\text{lat}_1) \cdot \sin(\text{lat}_2) + \cos(\text{lat}_1) \cdot \cos(\text{lat}_2) \cdot \cos(\text{long}_2 - \text{long}_1) \right)
\]


By using this method, we achieve accurate results without needing an external API, reducing costs and simplifying our tech stack.




















