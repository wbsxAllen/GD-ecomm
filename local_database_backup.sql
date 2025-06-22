-- MySQL dump 10.13  Distrib 9.2.0, for macos14.7 (x86_64)
--
-- Host: localhost    Database: gdecomm
-- ------------------------------------------------------
-- Server version	9.2.0

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
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `city` varchar(255) DEFAULT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `is_default` bit(1) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `receiver_name` varchar(255) DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1fa36y2oqhao3wgg2rw1pi459` (`user_id`),
  CONSTRAINT `FK1fa36y2oqhao3wgg2rw1pi459` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,'Edmonton','123 Jasper Ave',_binary '','123456','Alberta','JJJJJJJ','T5J1Z6',2,'Canada');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int DEFAULT NULL,
  `cart_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpcttvuq4mxppo8sxggjtn5i2c` (`cart_id`),
  KEY `FK1re40cjegsfvw58xrkdp6bac6` (`product_id`),
  CONSTRAINT `FK1re40cjegsfvw58xrkdp6bac6` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `FKpcttvuq4mxppo8sxggjtn5i2c` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK64t7ox312pqal3p7fg9o503c2` (`user_id`),
  CONSTRAINT `FKb5o626f86h46m4s7ms6ginnop` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,1),(4,2),(3,3),(2,7),(5,8);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` bigint NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `UK41g4n0emuvcm3qyf1f6cn43c0` (`category_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `price` decimal(38,2) NOT NULL,
  `quantity` int NOT NULL,
  `subtotal` decimal(38,2) NOT NULL,
  `order_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbioxgbv59vetrxe0ejfubep1w` (`order_id`),
  KEY `FKocimc7dtr037rh4ls4l95nlfi` (`product_id`),
  CONSTRAINT `FKbioxgbv59vetrxe0ejfubep1w` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `FKocimc7dtr037rh4ls4l95nlfi` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,99.99,2,199.98,1,1),(2,99.99,1,99.99,2,1),(3,99.99,1,99.99,3,1),(4,99.99,1,99.99,4,1),(5,99.99,1,99.99,5,1),(6,99.99,1,99.99,6,1),(7,99.99,1,99.99,7,1),(8,99.99,1,99.99,8,1),(9,99.99,1,99.99,9,1),(10,99.99,1,99.99,10,1),(11,99.99,1,99.99,11,1),(12,99.99,1,99.99,12,1),(13,99.99,3,299.97,13,1),(14,99.99,2,199.98,14,1),(15,99.99,2,199.98,15,1),(16,99.99,1,99.99,16,1),(17,99.99,1,99.99,17,1),(18,99.99,1,99.99,18,1),(19,99.99,1,99.99,19,1),(20,134.00,1,134.00,20,11),(21,120.00,1,120.00,20,7),(22,120.00,1,120.00,21,6),(23,120.00,1,120.00,22,7),(24,90.00,1,90.00,23,12),(25,100.00,1,100.00,24,4);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `complete_time` datetime(6) DEFAULT NULL,
  `create_time` datetime(6) NOT NULL,
  `order_number` varchar(255) NOT NULL,
  `pay_time` datetime(6) DEFAULT NULL,
  `ship_time` datetime(6) DEFAULT NULL,
  `status` enum('CANCELLED','COMPLETED','DELIVERED','PAID','PENDING_PAYMENT','SHIPPED') NOT NULL,
  `total_amount` decimal(38,2) NOT NULL,
  `address_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhlglkvf5i60dv6dn397ethgpt` (`address_id`),
  KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`),
  CONSTRAINT `FK32ql8ubntj5uh44ph9659tiih` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKhlglkvf5i60dv6dn397ethgpt` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,NULL,'2025-05-08 19:02:17.988799','d4c478458b6d','2025-06-16 13:59:41.955432',NULL,'PAID',199.98,1,2),(2,NULL,'2025-05-23 22:32:07.821686','c2369e267ebb',NULL,NULL,'CANCELLED',99.99,1,2),(3,NULL,'2025-05-23 22:35:16.625781','b1ecf10d00d2',NULL,NULL,'CANCELLED',99.99,1,2),(4,NULL,'2025-06-16 17:59:50.987444','be9d94d50811',NULL,NULL,'CANCELLED',99.99,1,2),(5,NULL,'2025-06-16 18:00:27.761760','596403839581',NULL,NULL,'CANCELLED',99.99,1,2),(6,NULL,'2025-06-16 18:13:35.311557','289dd8c54038',NULL,NULL,'CANCELLED',99.99,1,2),(7,NULL,'2025-06-16 18:13:48.990527','ac6f39803f5a',NULL,NULL,'CANCELLED',99.99,1,2),(8,NULL,'2025-06-17 14:09:01.442211','ef391a04c8d6',NULL,NULL,'CANCELLED',99.99,1,2),(9,NULL,'2025-06-17 14:09:43.965805','f9fafef8421d',NULL,NULL,'CANCELLED',99.99,1,2),(10,NULL,'2025-06-17 14:12:30.707246','b93042833f57',NULL,NULL,'CANCELLED',99.99,1,2),(11,NULL,'2025-06-17 15:42:59.172859','673c3d6e2ac0',NULL,NULL,'CANCELLED',99.99,1,2),(12,NULL,'2025-06-17 15:45:23.476384','fda41b543b5d',NULL,NULL,'CANCELLED',99.99,1,2),(13,NULL,'2025-06-17 15:47:53.559142','dd575ce790e0',NULL,NULL,'CANCELLED',299.97,1,2),(14,NULL,'2025-06-17 16:00:48.054566','b82290404182',NULL,NULL,'CANCELLED',199.98,1,2),(15,NULL,'2025-06-17 16:34:02.885695','818e72f22d17','2025-06-17 16:34:15.922698',NULL,'PAID',199.98,1,2),(16,NULL,'2025-06-17 16:42:02.851121','6a6d13deff50','2025-06-17 16:42:31.141513',NULL,'PAID',99.99,1,2),(17,NULL,'2025-06-17 16:48:58.870421','92c58ead5c4c','2025-06-17 16:49:11.560407',NULL,'PAID',99.99,1,2),(18,NULL,'2025-06-17 17:06:05.201926','f585b6e4af55','2025-06-17 17:06:24.799974',NULL,'PAID',99.99,1,2),(19,NULL,'2025-06-17 17:42:23.381939','88942141bc12','2025-06-17 17:42:41.041462',NULL,'PAID',99.99,1,2),(20,NULL,'2025-06-19 15:14:29.785973','f9e3b755ed25','2025-06-19 15:14:51.374623',NULL,'PAID',254.00,1,2),(21,NULL,'2025-06-19 15:44:39.858529','CFA0AEC079D6',NULL,NULL,'CANCELLED',120.00,1,2),(22,NULL,'2025-06-19 15:45:49.695900','3CE6298B3B82',NULL,NULL,'CANCELLED',120.00,1,2),(23,NULL,'2025-06-19 15:51:10.807974','0FF94744AC04','2025-06-19 15:51:27.326794',NULL,'PAID',90.00,1,2),(24,NULL,'2025-06-19 15:53:48.127538','96A107D7E536','2025-06-19 15:54:07.542486',NULL,'PAID',100.00,1,2);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amount` decimal(38,2) NOT NULL,
  `client_secret` varchar(255) NOT NULL,
  `create_time` datetime(6) NOT NULL,
  `currency` varchar(255) NOT NULL,
  `error_message` varchar(255) DEFAULT NULL,
  `payment_intent_id` varchar(255) NOT NULL,
  `payment_method` enum('PAYPAL','STRIPE') NOT NULL,
  `status` enum('CANCELLED','FAILED','PENDING','REFUNDED','SUCCEEDED') NOT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `order_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK81gagumt0r8y3rmudcgpbk42l` (`order_id`),
  CONSTRAINT `FK81gagumt0r8y3rmudcgpbk42l` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,1.00,'pi_3Raj8wQdzXJ0LLNZ5gSCNvc1_secret_p194lz7virqMzKUvyHQVLiSKT','2025-06-16 13:56:34.358024','usd',NULL,'pi_3Raj8wQdzXJ0LLNZ5gSCNvc1','STRIPE','SUCCEEDED','2025-06-16 13:59:41.941472',1),(2,99.99,'pi_3Ran61QdzXJ0LLNZ3mpFBJol_secret_eIhuEVLnGSo7GKcE4DukOyjjk','2025-06-16 18:09:49.752089','usd',NULL,'pi_3Ran61QdzXJ0LLNZ3mpFBJol','STRIPE','PENDING',NULL,5),(3,99.99,'pi_3Ran61QdzXJ0LLNZ4Y3UQOvF_secret_3q28ilCD36ld9VRm8nQuUxwn3','2025-06-16 18:09:49.752089','usd',NULL,'pi_3Ran61QdzXJ0LLNZ4Y3UQOvF','STRIPE','PENDING',NULL,5),(4,99.99,'pi_3Ran9tQdzXJ0LLNZ2jUlll9z_secret_N0RoJnIpXKonPOucyzjTKd1eM','2025-06-16 18:13:49.423153','usd',NULL,'pi_3Ran9tQdzXJ0LLNZ2jUlll9z','STRIPE','PENDING',NULL,7),(5,99.99,'pi_3Rb5oYQdzXJ0LLNZ4zAdT3dA_secret_uAtIRBGGh8cDE4hYFlfozpNdq','2025-06-17 14:09:02.188702','usd',NULL,'pi_3Rb5oYQdzXJ0LLNZ4zAdT3dA','STRIPE','PENDING',NULL,8),(6,99.99,'pi_3Rb5pEQdzXJ0LLNZ3cZE3EQX_secret_PZHnAzaeB9YkYbGBEWjNEcm4a','2025-06-17 14:09:44.368131','usd',NULL,'pi_3Rb5pEQdzXJ0LLNZ3cZE3EQX','STRIPE','PENDING',NULL,9),(7,99.99,'pi_3Rb7HTQdzXJ0LLNZ4NnVeBiU_secret_wvEM9iv49qsKSsZ4H8frpeomU','2025-06-17 15:42:59.657608','usd',NULL,'pi_3Rb7HTQdzXJ0LLNZ4NnVeBiU','STRIPE','PENDING',NULL,11),(8,99.99,'pi_3Rb7JnQdzXJ0LLNZ0sTSwjOO_secret_UAdop0s7HxQqsasuN7UQLyoGh','2025-06-17 15:45:23.911539','usd',NULL,'pi_3Rb7JnQdzXJ0LLNZ0sTSwjOO','STRIPE','PENDING',NULL,12),(9,299.97,'pi_3Rb7MDQdzXJ0LLNZ5iQicLPF_secret_l5jOQarKBpATMttRc6olaqlrY','2025-06-17 15:47:54.155467','usd',NULL,'pi_3Rb7MDQdzXJ0LLNZ5iQicLPF','STRIPE','PENDING',NULL,13),(10,199.98,'pi_3Rb7YiQdzXJ0LLNZ5MpxVE5Q_secret_DalJxFhkVr0EbRbBlbP7b2py0','2025-06-17 16:00:48.490313','usd',NULL,'pi_3Rb7YiQdzXJ0LLNZ5MpxVE5Q','STRIPE','PENDING',NULL,14),(11,199.98,'pi_3Rb84tQdzXJ0LLNZ5ysjEa9P_secret_FI1rYVMO0UF0iOCSeJPBJdjdP','2025-06-17 16:34:03.413465','usd',NULL,'pi_3Rb84tQdzXJ0LLNZ5ysjEa9P','STRIPE','SUCCEEDED','2025-06-17 16:34:15.918701',15),(12,99.99,'pi_3Rb8CdQdzXJ0LLNZ0ydwTVsJ_secret_LzK39eF1cgWjo8QHt6s5AU1Yo','2025-06-17 16:42:03.267356','usd',NULL,'pi_3Rb8CdQdzXJ0LLNZ0ydwTVsJ','STRIPE','SUCCEEDED','2025-06-17 16:42:31.133371',16),(13,99.99,'pi_3Rb8JLQdzXJ0LLNZ0zBMPuOd_secret_gCiTTKS4E13mgwyvQcHorID7i','2025-06-17 16:48:59.608288','usd',NULL,'pi_3Rb8JLQdzXJ0LLNZ0zBMPuOd','STRIPE','SUCCEEDED','2025-06-17 16:49:11.554073',17),(14,99.99,'pi_3Rb8ZtQdzXJ0LLNZ2n8mkAPh_secret_RMHhy1Dmox89i6g9KnIQwDVq3','2025-06-17 17:06:05.647685','usd',NULL,'pi_3Rb8ZtQdzXJ0LLNZ2n8mkAPh','STRIPE','SUCCEEDED','2025-06-17 17:06:24.794994',18),(15,99.99,'pi_3Rb992QdzXJ0LLNZ3u0hF3gE_secret_7jyR8TYDqnPn79K4Q9a2GAGY8','2025-06-17 17:42:24.197650','usd',NULL,'pi_3Rb992QdzXJ0LLNZ3u0hF3gE','STRIPE','SUCCEEDED','2025-06-17 17:42:41.036292',19),(16,254.00,'pi_3Rbpn0QdzXJ0LLNZ2HtwDtI0_secret_IXEZZfFOBsJrqR8la2kJkT7sP','2025-06-19 15:14:30.537980','usd',NULL,'pi_3Rbpn0QdzXJ0LLNZ2HtwDtI0','STRIPE','SUCCEEDED','2025-06-19 15:14:51.368514',20),(17,120.00,'pi_3RbqGCQdzXJ0LLNZ2bx9JKjd_secret_p4YL1c7yWHkdHB5evbigZ6MIP','2025-06-19 15:44:40.586977','usd',NULL,'pi_3RbqGCQdzXJ0LLNZ2bx9JKjd','STRIPE','PENDING',NULL,21),(18,120.00,'pi_3RbqHKQdzXJ0LLNZ52EumKtS_secret_8S8NlXZyMhE5IaJrwaz4G6AOL','2025-06-19 15:45:50.150539','usd',NULL,'pi_3RbqHKQdzXJ0LLNZ52EumKtS','STRIPE','PENDING',NULL,22),(19,90.00,'pi_3RbqMVQdzXJ0LLNZ2zoEUvu9_secret_Nn5xsu99lcP08U68mlk9tuuA1','2025-06-19 15:51:11.245603','usd',NULL,'pi_3RbqMVQdzXJ0LLNZ2zoEUvu9','STRIPE','SUCCEEDED','2025-06-19 15:51:27.300426',23),(20,100.00,'pi_3RbqP2QdzXJ0LLNZ24mcvjsl_secret_YKBelgBwdEap0AzYjiIjo0uwZ','2025-06-19 15:53:48.615418','usd',NULL,'pi_3RbqP2QdzXJ0LLNZ24mcvjsl','STRIPE','SUCCEEDED','2025-06-19 15:54:07.539329',24);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `grade` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_available` bit(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(38,2) NOT NULL,
  `scale` varchar(255) NOT NULL,
  `series` varchar(255) NOT NULL,
  `stock` int NOT NULL,
  `store_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgcyffheofvmy2x5l78xam63mc` (`store_id`),
  CONSTRAINT `FKgcyffheofvmy2x5l78xam63mc` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'','HG','/images/gundam-RX-78-2.jpg',_binary '','RX-78-2',30.00,'1_144','UC',94,1),(3,'','MG','/images/strikefreedom.webp',_binary '','Strikefreedom',150.99,'1_100','Seed',10,1),(4,'','MG','/images/unicorn.webp',_binary '','Unicorn',100.00,'1_100','UC',9,1),(5,'','MG','/images/00.webp',_binary '','00 Gundam',98.00,'1_100','00',30,1),(6,'','MG','/images/barbatos.jpg',_binary '','Barbatos',120.00,'1_100','Iron Blood Orphans',10,1),(7,'','MG','/images/vidal.jpg',_binary '','Vidal',120.00,'1_100','Iron Blood Orphans',4,1),(8,'','MG','/images/Aerial.jpg',_binary '','Aerial',91.00,'1_100','WITCH FROM MERCURY',14,1),(9,'','MG','/images/v.jpg',_binary '','V Gundam',156.00,'1_100','UC',4,1),(10,'','MG','/images/sazabi.jpg',_binary '','Sazabi',300.00,'1_100','UC',3,1),(11,'','MG','/images/sinanju.jpg',_binary '','Sinanju',134.00,'1_100','UC',5,1),(12,'','MG','/images/wingzero.jpg',_binary '','Wing Zero',90.00,'1_100','Endless Waltz',29,1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `rating` int NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `product_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpl51cejpw4gy5swfar8br9ngi` (`product_id`),
  KEY `FKcgy7qjc1r99dp117y9en6lxye` (`user_id`),
  CONSTRAINT `FKcgy7qjc1r99dp117y9en6lxye` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKpl51cejpw4gy5swfar8br9ngi` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,'Good','2025-05-16 16:46:19.371412',5,'2025-05-16 16:46:19.371458',1,3),(2,'Bad','2025-06-18 22:32:01.492005',1,'2025-06-18 22:32:01.492038',1,1),(3,'ok','2025-06-18 23:04:59.356706',3,'2025-06-18 23:04:59.356733',1,2);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` enum('ROLE_ADMIN','ROLE_BUYER','ROLE_SELLER') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ROLE_SELLER'),(2,'ROLE_BUYER'),(3,'ROLE_ADMIN');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stores`
--

DROP TABLE IF EXISTS `stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stores` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `is_active` bit(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  `seller_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK2yl4gisselw9ehmnupuqhl3ao` (`seller_id`),
  CONSTRAINT `FKld2r6ko6rsippfvx01q8lmfvh` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stores`
--

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;
INSERT INTO `stores` VALUES (1,'Welcome!',_binary '','seller1 store',1);
/*!40000 ALTER TABLE `stores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`),
  CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,1),(2,2),(3,2),(5,2),(6,2),(7,2),(8,2),(4,3);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `enabled` bit(1) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `signature` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'seller1@test.com',_binary '','Seller','One','$2a$10$vAS3wr6vqgbcS80Q7yJWfuLdZ7Zmtxo88/CEfriW9rwwgG1U5GA52','seller1',NULL,NULL,NULL,NULL),(2,'buyer1@test.com',_binary '','Buyer','One','$2a$10$5LaMQrP5/6NhEB6fw2ImIOq.eUwSRXWba3iK6u33BoairmtTQW/M6','buyer1',NULL,NULL,NULL,NULL),(3,'testuser@example.com',_binary '','Test','User','$2a$10$nbIvRijFo7UlSaY1G9xUM.eXo.axZBjy2Kf9qHyD6kQkyhVXzg.j.','testuser','https://example.com/new-avatar.jpg','1999-01-01','FEMALE','new signature'),(4,'admin@example.com',_binary '','Super','Admin','$2a$12$lb/xXjji6x.v.kHF1r0AqOoVRxCTVzKyJAerJyRIPsCPo3r5YINly','admin',NULL,NULL,NULL,NULL),(5,'testapi@example.com',_binary '','Test','Api','$2a$10$dzwqITDjzFGMYWKMeeRwOertRwPzAHOV0S2F10R0Mi1dvYOzX9qYS','testapi','https://example.com/avatar.jpg','1999-01-01','MALE',NULL),(6,'test@example.com',_binary '',NULL,NULL,'$2a$10$hKUdMjmdVKHqyxcnyD.oUOV5teUs2YJVDf4FGzA0A3Sa.BATcls/q','test',NULL,NULL,NULL,NULL),(7,'testfront@gmail.com',_binary '',NULL,NULL,'$2a$10$U6mXWWEvk8oaZKKvlomgze1vbeCylTzyJJvxJXF7vZ.vhXLHqQPN.','testfront',NULL,NULL,NULL,NULL),(8,'buyer2@test.com',_binary '',NULL,NULL,'$2a$10$.E1RxTeeno6tyC/lS9FvOueiu38XKiKd/N8t8lk4.nwH1UtwMORay','buyer2',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-21 18:11:24
