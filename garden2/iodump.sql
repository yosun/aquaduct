-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 07, 2014 at 11:13 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `beaner`
--

-- --------------------------------------------------------

--
-- Table structure for table `iodump`
--

CREATE TABLE IF NOT EXISTS `iodump` (
  `idint` int(11) NOT NULL AUTO_INCREMENT,
  `jsondump` longtext NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idint`),
  KEY `timestamp` (`timestamp`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=29 ;

--
-- Dumping data for table `iodump`
--

INSERT INTO `iodump` (`idint`, `jsondump`, `timestamp`) VALUES
(1, '{"id":"8d3dd2706595a9126bb8fdc6651","type":"armchair","width":50,"height":50,"angle":80,"wall":false,"movable":true,"x":440,"y":80}', '2014-12-07 06:55:16'),
(2, '{"id":"382ddf102c8c48ea1248d91424e","type":"wall","wall":true,"movable":true,"x":440,"y":400,"dx":240,"dy":-160}', '2014-12-07 21:52:56'),
(3, '{"id":"700a8fc35e2d83832a0bd01b882","type":"wall","wall":true,"movable":true,"x":720,"y":360,"dx":120,"dy":40}', '2014-12-07 21:53:20'),
(4, '{"id":"f70da7e3138611de4614a1c9bbf","type":"wall","wall":true,"movable":true,"x":920,"y":320,"dx":120,"dy":-120}', '2014-12-07 21:53:20'),
(5, '{"id":"5051a1303c826dd0605846cf9bd","type":"wall","wall":true,"movable":true,"x":1040,"y":320,"dx":-40,"dy":120}', '2014-12-07 21:53:21'),
(6, '{"id":"ae58541a232a5fbf5fb0cc4ba57","type":"wall","wall":true,"movable":true,"x":960,"y":520,"dx":-200,"dy":40}', '2014-12-07 21:53:21'),
(7, '{"id":"bacca10a43f7bc379a4a066f0a7","type":"wall","wall":true,"movable":true,"x":360,"y":200,"dx":0,"dy":320}', '2014-12-07 21:54:10'),
(8, '{"id":"a385dbffba1f50bbe8b8a53896","type":"wall","wall":true,"movable":true,"x":360,"y":520,"dx":440,"dy":0}', '2014-12-07 21:54:13'),
(9, '{"id":"c0fe780d3cac51717ab1b654361","type":"wall","wall":true,"movable":true,"x":800,"y":520}', '2014-12-07 22:00:02'),
(10, '{"id":"c0fe780d3cac51717ab1b654361","type":"wall","wall":true,"movable":true,"x":840,"y":480}', '2014-12-07 22:06:31'),
(11, '{"id":"2bba49e58ac48efe5888b9c3","type":"wall","wall":true,"movable":true,"x":840,"y":240,"dx":40,"dy":0}', '2014-12-07 22:06:34'),
(12, '{"id":"6e1fbe1375ff7e17d7e94c6a8ff","type":"wall","wall":true,"movable":true,"x":880,"y":320,"dx":-40,"dy":40}', '2014-12-07 22:06:35'),
(13, '{"id":"98bf05152a68f4f1c213c6389de","type":"wall","wall":true,"movable":true,"x":880,"y":360,"dx":40,"dy":0}', '2014-12-07 22:06:37'),
(14, '{"id":"c0fe780d3cac51717ab1b654361","type":"wall","wall":true,"movable":true,"x":800,"y":440}', '2014-12-07 22:06:39'),
(15, '{"id":"6ef8ca1eaee1ecc3cf6b1f33c1","type":"wall","wall":true,"movable":true,"x":880,"y":520,"dx":-40,"dy":-40}', '2014-12-07 22:06:42'),
(16, '{"id":"697a2fcf30fc3b53c7896945b74","type":"wall","wall":true,"movable":true,"x":840,"y":440,"dx":-40,"dy":40}', '2014-12-07 22:06:43'),
(17, '{"id":"7769a2471f9549eaab6c9659ea","type":"wall","wall":true,"movable":true,"x":680,"y":480,"dx":80,"dy":-280}', '2014-12-07 22:07:51'),
(18, '{"id":"7769a2471f9549eaab6c9659ea","type":"wall","wall":true,"movable":true,"x":680,"y":480,"dx":80,"dy":-280}', '2014-12-07 22:07:51'),
(19, '{"id":"50c33a175e9d5f78bc7d06b4088","type":"wall","wall":true,"movable":true,"x":640,"y":440,"dx":120,"dy":-200}', '2014-12-07 22:07:54'),
(20, '{"id":"a971a6eb21bf962f89e85d4220d","type":"wall","wall":true,"movable":true,"x":760,"y":240,"dx":-40,"dy":0}', '2014-12-07 22:07:57'),
(21, '{"id":"063e00d56d55089ec7551fe244","type":"wall","wall":true,"movable":true,"x":960,"y":280,"dx":-80,"dy":80}', '2014-12-07 22:07:59'),
(22, '{"id":"84ba4977e067ae34d63df56e3e","type":"wall","wall":true,"movable":true,"x":440,"y":520,"dx":240,"dy":-360}', '2014-12-07 22:08:02'),
(23, '{"id":"d9d0615153c02b387b80c93769e","type":"wall","wall":true,"movable":true,"x":400,"y":320,"dx":440,"dy":-200}', '2014-12-07 22:08:03'),
(24, '{"id":"3d2b56a57c82d5e9cb16972090d","type":"wall","wall":true,"movable":true,"x":440,"y":440,"dx":360,"dy":-280}', '2014-12-07 22:08:04'),
(25, '{"id":"3101e47ef87818649c02d1188e","type":"wall","wall":true,"movable":true,"x":920,"y":400,"dx":-40,"dy":80}', '2014-12-07 22:08:17'),
(26, '{"id":"3101e47ef87818649c02d1188e","type":"wall","wall":true,"movable":true,"x":920,"y":400,"dx":-40,"dy":80}', '2014-12-07 22:08:17'),
(27, '{"id":"bdb9132806e08f437168a25201f","type":"wall","wall":true,"movable":true,"x":720,"y":440,"dx":80,"dy":40}', '2014-12-07 22:08:18'),
(28, '{"id":"697a2fcf30fc3b53c7896945b74","type":"wall","wall":true,"movable":true,"x":840,"y":440,"dx":-40,"dy":40}', '2014-12-07 22:08:18');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
