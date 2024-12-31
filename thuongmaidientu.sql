-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 31, 2024 at 02:44 AM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thuongmaidientu`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `hasspassword` varchar(255) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `isActive` tinyint NOT NULL DEFAULT '0',
  `codeActive` varchar(255) DEFAULT NULL,
  `expiredCode` datetime DEFAULT NULL,
  `expiredCodeChangePassword` datetime DEFAULT NULL,
  `codeChangePassword` varchar(255) DEFAULT NULL,
  `expiredChangePassword` datetime DEFAULT NULL,
  `timePassword` int NOT NULL DEFAULT '5',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `hasspassword`, `firstname`, `surname`, `isActive`, `codeActive`, `expiredCode`, `expiredCodeChangePassword`, `codeChangePassword`, `expiredChangePassword`, `timePassword`) VALUES
(10, 'haohamhoc@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$gjqkpQbDq7Qj+P4RmpzcqQ$oJ7SOslqhR7iJjCZqsJg/3OdGI7Op52lZUBc4g/DK0w', 'Nguyễn', 'Gia Hào', 1, '484354', '2024-12-30 09:14:23', '2024-12-29 14:13:55', '347220', '2024-12-29 14:14:11', 5),
(11, 'khaikn@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$DcDFw6R7oV5lvXZRjHmVRg$fpNqmscTucqqQN+sKXCYndZuYoPW06ZqnTl7Ns3bmTA', 'Nguyễn', 'Văn Khải', 0, NULL, NULL, '2024-11-10 16:29:46', '889464', NULL, 5),
(14, 'tienmanh1221@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$2d1aEbxpfEOhX1f0Zfo+vw$JppAUSaBQpLzy3pqLVmsBe7roZ+aswvnYDqBYifJdPk', 'Nguyễn', 'Tiến Mạnh', 0, NULL, NULL, '2024-11-10 16:32:28', '760625', NULL, 5),
(20, 'tienlinh@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$eLoZo6CYa9D+jZErFyGGwA$+pSABrQXgX02mctssi+Jcn7tSnvTjJFzdXID2wl1/M8', 'Nguyễn', 'Tiến Linh', 1, '615154', '2024-11-08 12:32:35', NULL, NULL, NULL, 5),
(17, 'minhtran234@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$mXUuA6LPU7K5nsu/MI9hrw$BcOlL8swAdOI3aaXPHv6D5x9qYk7loLWDM/9TkUOnDg', 'Trần', 'Văn Minh', 0, '227427', '2024-11-08 10:26:11', '2024-11-11 20:23:12', '841931', NULL, 5),
(19, 'toantran0001000@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$st0T+S1YPpGgDhFxJnebEg$qJzpv3eitjaRG1+e7Ft9XU0QFxrbxEczil3t+BCKyAQ', 'Trần', 'Văn Toàn', 0, '949540', '2024-11-08 11:23:20', NULL, NULL, NULL, 5);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
