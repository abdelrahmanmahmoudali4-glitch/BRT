# 🚍 Smart BRT – AI-Powered Bus Rapid Transit Platform

An integrated, AI-powered **Smart Bus Rapid Transit (BRT)** ecosystem designed to modernize public transportation in Egypt. The platform combines a real-time computer vision engine with a web dashboard, a cross-platform mobile app, and a biometric access system to improve congestion management, fleet scheduling, onboard security, and the overall passenger experience.

> 🎓 Graduation Project – Electrical Engineering, Computer Engineering and Information Technology Department, Academic Year 2025–2026.
> Supervised by **Dr. Manar Mohamed Fattouh Donia**.

---

## 📌 Overview

Rapid urbanization and growing commuter demand create real challenges for BRT corridors: station congestion, poor fleet synchronization, and limited onboard security. Smart BRT addresses these problems by pairing **digital service layers** (web + mobile) with **Edge AI video analytics** built on YOLOv8, enabling real-time monitoring, automated alerts, and data-driven operational decisions.

---

## ✨ Key Features

### 🧠 AI & Computer Vision Modules
| # | Module | Description |
|---|--------|-------------|
| 1 | **Station Congestion Detection** | Crowd density profiling to support fleet scheduling |
| 2 | **Bidirectional Passenger Counting** | Real-time cabin occupancy using YOLOv8 + BoT-SORT tracking |
| 3 | **Violence & Abnormal Behavior Detection** | Hybrid model: EfficientNet-B0/U-Net autoencoder + ResNet3D-18 spatiotemporal classifier |
| 4 | **Weapon Detection** | Detects concealed or drawn weapons and threat objects |
| 5 | **Accident Detection & Prediction** | Kinematic hazard evaluation and collision-risk estimation |
| 6 | **Fire & Smoke Detection** | Early fire detection with spatial-temporal filtering |
| 7 | **Biometric Access Gates** | Facial recognition using ArcFace embeddings matched via FAISS |
| 8 | **Bus Lane Monitoring** | Automated lane-violation detection with license-plate recognition (OCR) |
| 9 | **Driver Behavior Assessment** | Monitors operator fatigue and distraction |

### 📱 Mobile Application (Flutter)
- Real-time bus tracking and live arrivals with crowd-level indicators
- Digital ticketing with QR codes and season passes
- In-app wallet (card, mobile wallet, and cash top-up options)
- Emergency **SOS** alerts with live-location sharing
- Incident reporting and support

### 🖥️ Web Platform (React)
- Public website: station locator, app showcase, and complaints/contact form
- Operator dashboard: live fleet status, route mapping, station management, and ticketing
- **Security Centre** for reviewing computer-vision alerts (human-in-the-loop validation)
- SOS emergency-alert handling and passenger account management

---

## 📊 Results

Evaluated on held-out test sets under challenging conditions (low light, occlusion, high crowd density):

| Module | Model | Precision | Recall | F1-Score | mAP@0.5 |
|--------|-------|-----------|--------|----------|---------|
| Station Congestion | YOLOv8m | 89.4% | 87.1% | 88.2% | 88.6% |
| Passenger Counting | YOLOv8n + BoT-SORT | 96.2% | 95.4% | 95.8% | – |
| Weapon Detection | YOLOv8s | 92.7% | 90.1% | 91.4% | 91.2% |
| Fire Detection | YOLOv8n | 94.1% | 93.0% | 93.5% | 93.8% |
| Lane Violation (OCR) | YOLOv8 + OCR | 90.5% | 88.3% | 89.4% | – |
| Biometric Access Gate | ArcFace + FAISS | 98.6% | 97.9% | 98.2% | – |

**Highlights:** Passenger counting directional accuracy above 95%, weapon detection mAP@0.5 of 91.2%, and sub-millisecond face-matching query latency using FAISS indexing.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|--------------|
| **AI / Computer Vision** | YOLOv8, BoT-SORT, Kalman Filter, ArcFace (InsightFace), FAISS, EfficientNet-B0/U-Net, ResNet3D-18, ONNX Runtime |
| **Backend** | .NET 8 (C#), ASP.NET, SignalR (real-time delivery), REST API (OpenAPI/Swagger) |
| **Database** | Microsoft SQL Server 2022 |
| **Mobile** | Flutter, flutter_bloc, get_it, dio, Google ML Kit |
| **Web** | React 18, Tailwind CSS, React Router, Vite |
| **Video Sources** | RTSP streams (OpenCvSharp), HTTP snapshots, file upload |

---

## 🏗️ System Architecture

The system follows a layered architecture:

1. **Edge Layer** – Cameras feed video to YOLOv8-based inference pipelines optimized for real-time Edge AI.
2. **Backend Layer** – A .NET 8 API processes detections, stores alerts, and pushes live updates through SignalR.
3. **Service Layer** – A React operator dashboard and a Flutter passenger app consume the API.
4. **Data Layer** – SQL Server stores identity, ticketing, transit network, telemetry, and CV-security data.

---

## 👥 Team

| Name | ID |
|------|----|
| Abdelrahman Mahmoud Ali Ahmed | 4220058 |
| Abdelrehem Mohamed Abdelrehem | 4220061 |
| Anasimon Semsem Mufid | 4220300 |
| Mohamed El-Kahlawy Mahmoud | 4220351 |
| Mohamed Hatem Abdelkhalek | 4220067 |
| Ahmed Alaa El-Din Abdelazez | 4200049 |

**Supervisor:** Dr. Manar Mohamed Fattouh Donia

---

## 🔮 Future Work

- Vision Transformer (ViT)-based violence detection
- 5G-enabled MEC federated learning architecture
- Unified edge–cloud telemetry for central scheduling intelligence

---

## 📄 License

This project was developed for academic purposes as part of a graduation project.
