-- MySQL dump 10.13  Distrib 8.0.33, for macos13.3 (arm64)
--
-- Host: localhost    Database: selection_test
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Attendances`
--

DROP TABLE IF EXISTS `Attendances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Attendances` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `clock_in` datetime DEFAULT NULL,
  `clock_out` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `attendances_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Attendances`
--

LOCK TABLES `Attendances` WRITE;
/*!40000 ALTER TABLE `Attendances` DISABLE KEYS */;
INSERT INTO `Attendances` VALUES (1,7,'2023-07-16 10:51:36','2023-07-16 11:09:02','2023-07-16 10:51:36','2023-07-16 11:09:02');
/*!40000 ALTER TABLE `Attendances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Employee_details`
--

DROP TABLE IF EXISTS `Employee_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Employee_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `birth_date` datetime NOT NULL,
  `join_date` datetime NOT NULL,
  `user_id` int NOT NULL,
  `salary_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `payroll_report_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `salary_id` (`salary_id`),
  KEY `Employee_details_payroll_report_id_foreign_idx` (`payroll_report_id`),
  CONSTRAINT `employee_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `employee_details_ibfk_2` FOREIGN KEY (`salary_id`) REFERENCES `Salaries` (`id`),
  CONSTRAINT `Employee_details_payroll_report_id_foreign_idx` FOREIGN KEY (`payroll_report_id`) REFERENCES `PayrollReports` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employee_details`
--

LOCK TABLES `Employee_details` WRITE;
/*!40000 ALTER TABLE `Employee_details` DISABLE KEYS */;
INSERT INTO `Employee_details` VALUES (1,'Kiki','1996-06-11 17:00:00','2023-07-14 17:00:00',5,1,'2023-07-15 23:49:59','2023-07-15 23:49:59',NULL),(2,'Kiki','1996-06-11 17:00:00','2023-07-14 17:00:00',6,2,'2023-07-15 23:51:44','2023-07-15 23:51:44',NULL),(3,'Sudiddo','1996-06-11 17:00:00','2023-07-14 17:00:00',7,3,'2023-07-16 00:00:50','2023-07-16 00:00:50',NULL),(4,'Diddo','1996-03-11 17:00:00','1995-03-11 17:00:00',8,4,'2023-07-16 10:02:56','2023-07-16 10:02:56',NULL),(5,'Manusia ','1996-12-11 17:00:00','1996-12-11 17:00:00',9,5,'2023-07-16 10:07:00','2023-07-16 10:07:00',NULL);
/*!40000 ALTER TABLE `Employee_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PayrollReports`
--

DROP TABLE IF EXISTS `PayrollReports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PayrollReports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_detail_id` int DEFAULT NULL,
  `salary_deductions` int DEFAULT NULL,
  `total_salary` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_detail_id` (`employee_detail_id`),
  CONSTRAINT `payrollreports_ibfk_1` FOREIGN KEY (`employee_detail_id`) REFERENCES `Employee_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PayrollReports`
--

LOCK TABLES `PayrollReports` WRITE;
/*!40000 ALTER TABLE `PayrollReports` DISABLE KEYS */;
/*!40000 ALTER TABLE `PayrollReports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Roles`
--

DROP TABLE IF EXISTS `Roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Roles`
--

LOCK TABLES `Roles` WRITE;
/*!40000 ALTER TABLE `Roles` DISABLE KEYS */;
INSERT INTO `Roles` VALUES (1,'ADMIN','2023-07-15 23:48:58','2023-07-15 23:48:58'),(2,'STAFF','2023-07-15 23:48:58','2023-07-15 23:48:58');
/*!40000 ALTER TABLE `Roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Salaries`
--

DROP TABLE IF EXISTS `Salaries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Salaries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `basic_salary` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Salaries`
--

LOCK TABLES `Salaries` WRITE;
/*!40000 ALTER TABLE `Salaries` DISABLE KEYS */;
INSERT INTO `Salaries` VALUES (1,5000000,'2023-07-15 23:49:59','2023-07-15 23:49:59'),(2,5000000,'2023-07-15 23:51:44','2023-07-15 23:51:44'),(3,5000000,'2023-07-16 00:00:50','2023-07-16 00:00:50'),(4,123,'2023-07-16 10:02:56','2023-07-16 10:02:56'),(5,123,'2023-07-16 10:07:00','2023-07-16 10:07:00');
/*!40000 ALTER TABLE `Salaries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20230713073352-create-role.js'),('20230713073353-create-user.js'),('20230713073529-create-salary.js'),('20230713073531-create-employee-details.js'),('20230713075059-create-attendace.js'),('20230716112616-create-payroll-report.js'),('20230716112713-add-payroll-report-to-employee-detail.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `access_token` varchar(255) DEFAULT NULL,
  `role_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `Roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'prizkideanne+1@gmail.com','$2a$10$bOILn/69F12Gdar.a47OWOBDSLpgf7cWaCLX3pjcY7z1tOeAWQ0s6','',1,'2023-07-15 23:48:58','2023-07-15 23:48:58'),(5,'kiki1@gmailcom',NULL,'a1400855ce1e3a74232ac54057ac814b',2,'2023-07-15 23:49:59','2023-07-15 23:49:59'),(6,'prizkideanne@gmailcom',NULL,'85b5b13497d2c0e5f7980eadc876b383',2,'2023-07-15 23:51:44','2023-07-15 23:51:44'),(7,'su.diddo@outlook.com','$2a$10$RfyTxf7u4B5H2iaDG2a8v.MDICi25.4PC3js/CRtY7dnZD9ecpL46',NULL,2,'2023-07-16 00:00:50','2023-07-16 00:23:05'),(8,'diddo@diddo.com',NULL,'e93d91d68153a5845b531ca3a5fb4eca',1,'2023-07-16 10:02:56','2023-07-16 10:02:56'),(9,'manusia.kuat@gmail.com',NULL,'20c16bad57fade852e5ed7e2baff7598',1,'2023-07-16 10:07:00','2023-07-16 10:07:00');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-16 18:36:45
