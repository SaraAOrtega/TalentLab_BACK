-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-10-2024 a las 13:24:24
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `talentlab_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actores`
--

CREATE TABLE `actores` (
  `id_actor` int(8) NOT NULL,
  `nombre_actor` varchar(255) NOT NULL,
  `edad` int(11) NOT NULL,
  `sexo` varchar(255) NOT NULL,
  `altura` varchar(255) NOT NULL,
  `complexion` varchar(255) NOT NULL,
  `color_ojos` varchar(255) NOT NULL,
  `color_pelo` varchar(255) NOT NULL,
  `tipo_pelo` varchar(255) NOT NULL,
  `corte_pelo` varchar(255) NOT NULL,
  `tez` varchar(255) NOT NULL,
  `idiomas` varchar(255) NOT NULL,
  `skills` varchar(255) NOT NULL,
  `carnet_conducir` varchar(255) NOT NULL,
  `foto_actor` varchar(255) NOT NULL,
  `foto2_actor` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `actores`
--

INSERT INTO `actores` (`id_actor`, `nombre_actor`, `edad`, `sexo`, `altura`, `complexion`, `color_ojos`, `color_pelo`, `tipo_pelo`, `corte_pelo`, `tez`, `idiomas`, `skills`, `carnet_conducir`, `foto_actor`, `foto2_actor`) VALUES
(1, 'Juan Rodríguez', 32, 'hombre', '184', 'xs', 'marrones', 'rubio', 'ondulado', 'corto', 'clara', 'inglés', 'deportes extremos', '0', '1_1.png', '1_2.png'),
(2, 'Juan Fernández', 38, 'hombre', '184', 'xxl', 'azules', 'castaño', 'liso', 'corto', 'media', 'alemán', 'equitación', '0', '2_1.png', '2_2.png'),
(3, 'Fernando Álvarez', 35, 'hombre', '171', 'xs', 'negros', 'castaño', 'liso', 'medio', 'morena', 'francés', 'motocicleta', '0', '3_1.png', '3_2.png'),
(4, 'David González', 40, 'hombre', '191', 'xxl', 'verdes', 'negro', 'liso', 'medio', 'media', 'alemán', 'skate', '0', '4_1.png', '4_2.png'),
(5, 'Alejandro Romero', 60, 'hombre', '197', 'm', 'negros', 'canoso', 'liso', 'largo', 'muy clara', 'francés', 'motocicleta', '1', '5_1.png', '5_2.png'),
(6, 'Fernando Fernández', 35, 'hombre', '164', 's', 'negros', 'castaño', 'liso', 'corto', 'muy clara', 'inglés', 'canto', '0', '6_1.png', '6_2.png'),
(7, 'Javier Pérez', 25, 'hombre', '169', 'xl', 'marrones', 'castaño', 'rizado', 'muy largo', 'muy clara', 'italiano', 'danza', '1', '7_1.png', '7_2.png'),
(8, 'Juan Romero', 37, 'hombre', '199', 'm', 'grises', 'negro', 'liso', 'medio', 'my morena', 'alemán', 'rollers', '0', '8_1.png', '8_2.png'),
(9, 'Pedro Rodríguez', 22, 'hombre', '195', 'm', 'negros', 'negro', 'afro', 'corto', 'muy morena', 'catalán', 'skate', '0', '9_1.png', '9_2.png'),
(10, 'David Díaz', 54, 'hombre', '177', 'xs', 'negros', 'negro', 'ondulado', 'corto', 'clara', 'inglés', 'equitación', '0', '10_1.png', '10_2.png'),
(11, 'Juan Pérez', 22, 'hombre', '191', 'l', 'grises', 'pelirrojo', 'rastas', 'largo', 'muy clara', 'italiano', 'bicicleta', '0', '11_1.png', '11_2.png'),
(12, 'Alejandro Ruiz', 45, 'hombre', '179', 'xl', 'grises', 'canoso', 'calvo parcial', 'corto', 'media', 'italiano', 'danza', '0', '12_1.png', '12_2.png'),
(13, 'Fernando Gómez', 33, 'hombre', '174', 'l', 'grises', 'castaño', 'liso', 'medio', 'media', 'italiano', 'skate', '1', '13_1.png', '13_2.png'),
(14, 'Juan Romero', 27, 'hombre', '192', 'l', 'grises', 'castaño', 'ondulado', 'corto', 'oscura', 'catalán', 'danza', '0', '14_1.png', '14_2.png'),
(15, 'Miguel Álvarez', 24, 'hombre', '164', 's', 'verdes', 'negro', 'ondulado', 'largo', 'morena', 'clara', 'canto', '1', '15_1.png', '15_2.png'),
(16, 'Luis Sánchez', 35, 'hombre', '181', 'xxl', 'verdes', 'rubio', 'liso', 'corto', 'muy morena', 'alemán', 'danza', '0', '16_1.png', '16_2.png'),
(17, 'Alejandro Gómez', 23, 'hombre', '165', 'xl', 'grises', 'canoso', 'calvo parcial', 'largo', 'muy morena', 'catalán', 'danza', '1', '17_1.png', '17_2.png'),
(18, 'Fernando Álvarez', 68, 'hombre', '176', 'l', 'negros', 'rubio', 'liso', 'corto', 'media', 'alemán', 'equitación', '1', '18_1.png', '18_2.png'),
(19, 'Luis Rodríguez', 47, 'hombre', '183', 'xxxl', 'negros', 'negro', 'liso', 'corto', 'muy clara', 'inglés', 'rollers', '1', '19_1.png', '19_2.png'),
(20, 'Javier Álvarez', 54, 'hombre', '180', 'xxl', 'negros', 'canoso', 'liso ', 'corto', 'muy clara', 'catalán', 'canto', '1', '20_1.png', '20_2.png'),
(21, 'Miguel Álvarez', 25, 'hombre', '195', 'xl', 'negros', 'negro', 'afro', 'medio', 'my morena', 'alemán', 'motocicleta', '1', '21_1.png', '21_2.png'),
(22, 'Alejandro Díaz', 38, 'hombre', '159', 'xl', 'grises', 'negro', 'afro', 'corto', 'oscura', 'italiano', 'deportes extremos', '1', '22_1.png', '22_2.png'),
(23, 'David Álvarez', 29, 'hombre', '196', 'xs', 'negros', 'castaño', 'rastas', 'largo', 'oscura', 'catalán', 'bicicleta', '1', '23_1.png', '23_2.png'),
(24, 'Fernando González', 32, 'hombre', '162', 'xxl', 'negros', 'castaño', 'liso ', 'corto', 'clara', 'inglés', 'rollers', '1', '24_1.png', '24_2.png'),
(25, 'Ricardo Fernández', 60, 'hombre', '161', 'xl', 'negros', 'negro', 'ondulado', 'largo', 'oscura', 'francés', 'skate', '0', '25_1.png', '25_2.png'),
(26, 'Carmen Martínez', 30, 'mujer', '163', 'm', 'marrones', 'rubio', 'rizado', 'largo', 'media', 'alemán', 'motocicleta', '0', '26_1.png', '26_2.png'),
(27, 'Paula Rodríguez', 21, 'mujer', '176', 'xl', 'negros', 'rubio', 'rastas', 'largo', 'morena', 'alemán', 'equitación', '1', '27_1.png', '27_2.png'),
(28, 'Elena Pérez', 34, 'mujer', '170', 's', 'negros', 'castaño ', 'liso ', 'medio', 'muy clara', 'catalán', 'bicicleta', '0', '28_1.png', '28_2.png'),
(29, 'Ana Rodríguez', 37, 'mujer', '160', 'l', 'verdes', 'castaño ', 'ondulado', 'corto', 'clara', 'catalán', 'skate', '0', '29_1.png', '29_2.png'),
(30, 'Lucía Álvarez', 19, 'mujer', '185', 'xl', 'azules', 'rubia', 'rastas', 'largo', 'media', 'inglés', 'bicicleta', '0', '30_1.png', '30_2.png'),
(31, 'Lucía González', 20, 'mujer', '170', 'xs', 'verdes', 'tintado', 'liso ', 'medio', 'morena', 'francés', 'bicicleta', '1', '31_1.png', '31_2.png'),
(32, 'Paula Álvarez', 23, 'mujer', '158', 'xl', 'negros', 'negro', 'ondulado', 'muy largo', 'clara', 'catalán', 'skate', '0', '32_1.png', '32_2.png'),
(33, 'Sofía Pérez', 45, 'mujer', '198', 'l', 'verdes', 'tintado', 'liso', 'muy largo', 'clara', 'alemán', 'canto', '1', '33_1.png', '33_2.png'),
(34, 'Paula Martínez', 23, 'mujer', '178', 's', 'marrones', 'negro ', 'rizado', 'medio ', 'oscura', 'alemán', 'bicicleta', '1', '34_1.png', '34_2.png'),
(35, 'Laura Gómez', 21, 'mujer', '187', 'xs', 'marrones', 'liso', 'liso ', 'muy largo', 'muy morena', 'catalán', 'skate', '0', '35_1.png', '35_2.png'),
(36, 'María Martínez', 70, 'mujer', '155', 'xl', 'verdes', 'tintado', 'ondulado', 'corto', 'media', 'alemán', 'rollers', '0', '36_1.png', '36_2.png'),
(37, 'Paula Gómez', 50, 'mujer', '160', 'l', 'marrones', 'castaño ', 'ondulado', 'medio ', 'morena', 'francés', 'rollers', '0', '37_1.png', '37_2.png'),
(38, 'Isabel Romero', 61, 'mujer', '179', 's', 'verdes', 'canoso', 'liso ', 'medio ', 'media', 'alemán', 'deportes extremos', '0', '38_1.png', '38_2.png'),
(39, 'Sofía Sánchez', 20, 'mujer', '170', 's', 'marrones', 'pelirrojo ', 'liso', 'largo', 'my clara', 'inglés', 'deportes extremos', '0', '39_1.png', '39_2.png'),
(40, 'Elena Romero', 35, 'mujer', '164', 'l', 'negros', 'nego ', 'rizado', 'medio', 'morena', 'francés', 'equitación', '0', '40_1.png', '40_2.png'),
(41, 'Elena Álvarez', 68, 'mujer', '161', 's', 'azules', 'canoso', 'liso ', 'largo', 'media', 'francés', 'skate', '1', '41_1.png', '41_2.png'),
(42, 'Laura Fernández', 32, 'mujer', '157', 'xs', 'grises', 'negro ', 'rastas', 'largo ', 'oscura', 'inglés', 'motocicleta', '1', '42_1.png', '42_2.png'),
(43, 'María Gómez', 24, 'mujer', '170', 's', 'verdes', 'tintado', 'rastas', 'largo', 'oscura', 'catalán', 'bicicleta', '0', '43_1.png', '43_2.png'),
(44, 'Lucía Rodríguez', 21, 'mujer', '170', 'l', 'azules', 'rubio', 'liso ', 'muy largo ', 'oscura', 'italiano', 'skate', '0', '44_1.png', '44_2.png'),
(45, 'Elena Gómez', 38, 'mujer', '155', 'm', 'grises', 'tintado', 'rizado ', 'medio ', 'media', 'catalán', 'bicicleta', '0', '45_1.png', '45_2.png'),
(46, 'Paula Pérez', 45, 'mujer', '156', 'm', 'azules ', 'castaño ', 'rizado', 'ondulado', 'clara', 'francés', 'skate', '0', '46_1.png', '46_2.png'),
(47, 'Elena Martínez', 36, 'mujer', '159', 'xs', 'negros', 'castaño ', 'ondulado ', 'largo ', 'muy clara', 'catalán', 'canto', '1', '47_1.png', '47_2.png'),
(48, 'Sofía Pérez', 41, 'mujer', '174', 'xs', 'negros ', 'castaño ', 'liso ', 'muy largo', 'muy morena', 'inglés', 'danza', '1', '48_1.png', '48_2.png'),
(49, 'Paula González', 38, 'mujer', '191', 'l', 'grises', 'rubio', 'rizado', 'corto', 'morena', 'alemán', 'bicicleta', '0', '49_1.png', '49_2.png'),
(50, 'Laura Rodríguez', 57, 'mujer', '185', 'xs', 'marrones', 'negro ', 'liso ', 'corto', 'morena ', 'inglés', 'equitación', '1', '50_1.png', '50_2.png'),
(51, 'Alex Romero', 26, 'no binario', '160', 'm', 'negros', 'tintado ', 'liso ', 'corto ', 'muy clara', 'francés', 'motocicleta', '1', '51_1.png', '51_2.png'),
(52, 'Fer Fernández', 25, 'no binario', '169', 's', 'azules', 'tintado', 'liso', 'corto', 'muy clara', 'inglés', 'canto', '0', '52_1.png', '52_2.png'),
(53, 'Sam Luque', 36, 'no binario', '165', 'l', 'marrones', 'negro ', 'ondulado ', 'corto ', 'morena', 'italiano', 'danza', '1', '53_1.png', '53_2.png'),
(54, 'Ellen Ortíz', 40, 'no binario', '170', 'm', 'grises', 'rubio', 'liso ', 'corto ', 'media', 'alemán', 'rollers', '0', '54_2.png', '54_1.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personajeactores`
--

CREATE TABLE `personajeactores` (
  `actorId` int(8) NOT NULL,
  `personajeId` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personajeactores`
--

INSERT INTO `personajeactores` (`actorId`, `personajeId`) VALUES
(1, 236),
(2, 231),
(4, 229),
(4, 230),
(4, 236),
(5, 229),
(5, 231),
(6, 229),
(6, 236),
(7, 234),
(8, 234),
(9, 233),
(10, 233),
(11, 234),
(12, 231),
(13, 232),
(18, 232),
(19, 232),
(20, 232),
(21, 230),
(27, 237),
(28, 237),
(30, 237),
(31, 233),
(32, 230),
(33, 235),
(35, 229),
(35, 235),
(36, 235),
(37, 232),
(38, 232),
(40, 229),
(40, 230),
(40, 233),
(41, 232),
(42, 235),
(44, 229),
(52, 230);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personajes`
--

CREATE TABLE `personajes` (
  `id_personaje` int(8) NOT NULL,
  `proyecto_id` int(8) DEFAULT NULL,
  `rol` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personajes`
--

INSERT INTO `personajes` (`id_personaje`, `proyecto_id`, `rol`, `descripcion`) VALUES
(229, 134, 'Protagonista', 'Alumna en aula'),
(230, 134, 'Secundario', 'asnasd'),
(231, 135, 'Protagonista', 'Mentor'),
(232, 136, 'Protagonista', 'Jefe de equipos '),
(233, 136, 'Protagonista', 'Trabajador puerto '),
(234, 137, 'Reparto', 'Cliente 1'),
(235, 137, 'Reparto', 'Cliente 2'),
(236, 138, 'Protagonista', ''),
(237, 138, 'Protagonista', ''),
(238, 138, 'Secundario', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos`
--

CREATE TABLE `proyectos` (
  `id_proyecto` int(8) NOT NULL,
  `user_id` int(8) NOT NULL,
  `nombre_proyecto` varchar(255) NOT NULL,
  `director_proyecto` varchar(255) NOT NULL,
  `fecha_pdv` datetime DEFAULT NULL,
  `fecha_rodaje` datetime DEFAULT NULL,
  `lugar` text DEFAULT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proyectos`
--

INSERT INTO `proyectos` (`id_proyecto`, `user_id`, `nombre_proyecto`, `director_proyecto`, `fecha_pdv`, `fecha_rodaje`, `lugar`, `descripcion`) VALUES
(134, 19, 'IT ACADEMY ', 'Laura Gómez', '2024-09-28 00:00:00', '2024-09-29 00:00:00', 'Barcelona', 'Inicio Curso'),
(135, 19, 'Barcelona Activa ', 'Esteban Gómez', '2024-10-18 00:00:00', '2024-10-18 00:00:00', 'Barcelona ', 'Barcelona Activa '),
(136, 19, 'Ametller Origen ', 'Sandra Fernández', '2024-10-12 00:00:00', '2024-10-26 00:00:00', 'Barcelona, zona franca', 'Instalaciones '),
(137, 19, 'Carrefour ', 'Raúl Martínez', '2024-10-29 00:00:00', '2024-10-30 00:00:00', 'Carrefour Barcelona Glories', 'Clientes supermercado'),
(138, 19, 'Dechatlon ', 'Susana Giménez', '2024-12-13 00:00:00', '2024-12-27 00:00:00', 'Barcelona, Mataró ', 'Dechatlon ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(8) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `documento` varchar(255) NOT NULL,
  `rol` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `username`, `email`, `password`, `documento`, `rol`, `createdAt`, `updatedAt`) VALUES
(19, 'Productora', 'productora@productora.com', '$2b$10$rAa6P/D16t59yKzWhpNCK.cFidZGCdYFC/UUwlcH3qF1qiHfwRDWi', 'qweqwewq', NULL, '2024-08-29 10:56:42', '2024-08-29 10:56:42');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actores`
--
ALTER TABLE `actores`
  ADD PRIMARY KEY (`id_actor`);

--
-- Indices de la tabla `personajeactores`
--
ALTER TABLE `personajeactores`
  ADD PRIMARY KEY (`actorId`,`personajeId`),
  ADD KEY `fk_personaje` (`personajeId`);

--
-- Indices de la tabla `personajes`
--
ALTER TABLE `personajes`
  ADD PRIMARY KEY (`id_personaje`),
  ADD KEY `proyecto_id` (`proyecto_id`);

--
-- Indices de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`id_proyecto`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email_user` (`email`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `email_19` (`email`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `email_21` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actores`
--
ALTER TABLE `actores`
  MODIFY `id_actor` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `personajes`
--
ALTER TABLE `personajes`
  MODIFY `id_personaje` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=239;

--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `id_proyecto` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `personajeactores`
--
ALTER TABLE `personajeactores`
  ADD CONSTRAINT `personajeactores_ibfk_1` FOREIGN KEY (`personajeId`) REFERENCES `personajes` (`id_personaje`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `personajeactores_ibfk_2` FOREIGN KEY (`actorId`) REFERENCES `actores` (`id_actor`);

--
-- Filtros para la tabla `personajes`
--
ALTER TABLE `personajes`
  ADD CONSTRAINT `personajes_ibfk_10` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id_proyecto`),
  ADD CONSTRAINT `personajes_ibfk_11` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id_proyecto`),
  ADD CONSTRAINT `personajes_ibfk_12` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id_proyecto`),
  ADD CONSTRAINT `personajes_ibfk_13` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id_proyecto`),
  ADD CONSTRAINT `personajes_ibfk_14` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id_proyecto`),
  ADD CONSTRAINT `personajes_ibfk_15` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id_proyecto`),
  ADD CONSTRAINT `personajes_ibfk_16` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id_proyecto`),
  ADD CONSTRAINT `personajes_ibfk_17` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id_proyecto`),
  ADD CONSTRAINT `personajes_ibfk_2` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id_proyecto`),
  ADD CONSTRAINT `personajes_ibfk_3` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id_proyecto`),
  ADD CONSTRAINT `personajes_ibfk_4` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id_proyecto`),
  ADD CONSTRAINT `personajes_ibfk_5` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id_proyecto`),
  ADD CONSTRAINT `personajes_ibfk_6` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id_proyecto`),
  ADD CONSTRAINT `personajes_ibfk_7` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id_proyecto`),
  ADD CONSTRAINT `personajes_ibfk_8` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id_proyecto`),
  ADD CONSTRAINT `personajes_ibfk_9` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id_proyecto`);

--
-- Filtros para la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD CONSTRAINT `proyectos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `proyectos_ibfk_10` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `proyectos_ibfk_11` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `proyectos_ibfk_12` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `proyectos_ibfk_13` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `proyectos_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `proyectos_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `proyectos_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `proyectos_ibfk_5` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `proyectos_ibfk_6` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `proyectos_ibfk_7` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `proyectos_ibfk_8` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `proyectos_ibfk_9` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
