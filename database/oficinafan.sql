-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.4.3 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table oficina_mecanica_fan.cache
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table oficina_mecanica_fan.cache: ~12 rows (approximately)
DELETE FROM `cache`;
INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
	('fan-cache-958e364db509656440fe546404e857a0', 'i:1;', 1789043545),
	('fan-cache-958e364db509656440fe546404e857a0:timer', 'i:1789043545;', 1789043545),
	('fan-cache-aa6848262e1bd8f20cef7f5629c8cef5', 'i:1;', 1789036108),
	('fan-cache-aa6848262e1bd8f20cef7f5629c8cef5:timer', 'i:1789036108;', 1789036108),
	('fan-cache-c1e8094506e46971847e96aab5db2017', 'i:1;', 1788992818),
	('fan-cache-c1e8094506e46971847e96aab5db2017:timer', 'i:1788992818;', 1788992818);

-- Dumping structure for table oficina_mecanica_fan.cache_locks
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table oficina_mecanica_fan.cache_locks: ~0 rows (approximately)
DELETE FROM `cache_locks`;

-- Dumping structure for table oficina_mecanica_fan.failed_jobs
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`),
  KEY `failed_jobs_connection_queue_failed_at_index` (`connection`,`queue`,`failed_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table oficina_mecanica_fan.failed_jobs: ~0 rows (approximately)
DELETE FROM `failed_jobs`;

-- Dumping structure for table oficina_mecanica_fan.jobs
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` smallint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table oficina_mecanica_fan.jobs: ~0 rows (approximately)
DELETE FROM `jobs`;

-- Dumping structure for table oficina_mecanica_fan.job_batches
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table oficina_mecanica_fan.job_batches: ~0 rows (approximately)
DELETE FROM `job_batches`;

-- Dumping structure for table oficina_mecanica_fan.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table oficina_mecanica_fan.migrations: ~0 rows (approximately)
DELETE FROM `migrations`;
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '0001_01_01_000000_create_users_table', 1),
	(2, '0001_01_01_000001_create_cache_table', 1),
	(3, '0001_01_01_000002_create_jobs_table', 1),
	(4, '2026_01_27_000001_create_teams_table', 1),
	(5, '2026_01_27_000002_add_current_team_id_to_users_table', 1),
	(6, '2026_09_06_064938_add_two_factor_columns_to_users_table', 1),
	(7, '2026_09_06_064939_create_passkeys_table', 1);

-- Dumping structure for table oficina_mecanica_fan.passkeys
CREATE TABLE IF NOT EXISTS `passkeys` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `credential_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `credential` json NOT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `passkeys_credential_id_unique` (`credential_id`),
  KEY `passkeys_user_id_index` (`user_id`),
  CONSTRAINT `passkeys_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table oficina_mecanica_fan.passkeys: ~0 rows (approximately)
DELETE FROM `passkeys`;

-- Dumping structure for table oficina_mecanica_fan.password_reset_tokens
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table oficina_mecanica_fan.password_reset_tokens: ~0 rows (approximately)
DELETE FROM `password_reset_tokens`;
INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
	('hsonhi@yandex.com', '$2y$12$DEdnHWSUy0RXXV1RxxffS.GjHuP/LVfZ3uunPbq8Moys859gbBVRe', '2026-09-10 09:20:05');

-- Dumping structure for table oficina_mecanica_fan.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table oficina_mecanica_fan.sessions: ~1 rows (approximately)
DELETE FROM `sessions`;
INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
	('uGK9JqMlvOzY2tK6ncqMTutrB0QAv6PzqzZP46IX', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36 Edg/152.0.0.0', 'eyJfdG9rZW4iOiJGYmtsdmNzcURKV3lmbWVZVU1XTXd1NGxXWFFCT3RIejFtYlpjTDlMIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9sb2dpbiIsInJvdXRlIjoibG9naW4ifSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119LCJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI6MX0=', 1789043645),
	('VHl4lknEDYqwvuKmX8OtmbwbaYSGRh5ywWPLUwiw', 26, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36 Edg/152.0.0.0', 'eyJfdG9rZW4iOiJuZ0R4ZkhOOVZxWmYwbk5jNmczSHlKc2g5UnpEUldudDBJNzMzdlVPIiwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119LCJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI6MjZ9', 1789036067);

-- Dumping structure for table oficina_mecanica_fan.teams
CREATE TABLE IF NOT EXISTS `teams` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_personal` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `teams_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table oficina_mecanica_fan.teams: ~2 rows (approximately)
DELETE FROM `teams`;
INSERT INTO `teams` (`id`, `name`, `slug`, `is_personal`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(7, 'Administrador', 'administrador', 1, '2026-09-06 20:54:18', '2026-09-06 20:54:18', NULL),
	(8, 'Recepcionista', 'recepcionista', 0, '2026-09-09 21:15:24', '2026-09-09 15:42:46', NULL);

-- Dumping structure for table oficina_mecanica_fan.team_invitations
CREATE TABLE IF NOT EXISTS `team_invitations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `team_id` bigint unsigned NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invited_by` bigint unsigned NOT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `accepted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `team_invitations_code_unique` (`code`),
  KEY `team_invitations_team_id_foreign` (`team_id`),
  KEY `team_invitations_invited_by_foreign` (`invited_by`),
  CONSTRAINT `team_invitations_invited_by_foreign` FOREIGN KEY (`invited_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `team_invitations_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table oficina_mecanica_fan.team_invitations: ~0 rows (approximately)
DELETE FROM `team_invitations`;

-- Dumping structure for table oficina_mecanica_fan.team_members
CREATE TABLE IF NOT EXISTS `team_members` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `team_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `team_members_team_id_user_id_unique` (`team_id`,`user_id`),
  KEY `team_members_user_id_foreign` (`user_id`),
  CONSTRAINT `team_members_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE,
  CONSTRAINT `team_members_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table oficina_mecanica_fan.team_members: ~5 rows (approximately)
DELETE FROM `team_members`;
INSERT INTO `team_members` (`id`, `team_id`, `user_id`, `role`, `created_at`, `updated_at`) VALUES
	(1, 7, 1, 'member', '2026-09-06 05:53:26', '2026-09-06 05:53:26'),
	(27, 8, 26, 'member', NULL, NULL);

-- Dumping structure for table oficina_mecanica_fan.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` int DEFAULT NULL,
  `patent` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxid` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `two_factor_secret` text COLLATE utf8mb4_unicode_ci,
  `two_factor_recovery_codes` text COLLATE utf8mb4_unicode_ci,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `current_team_id` bigint unsigned DEFAULT NULL,
  `role` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_current_team_id_foreign` (`current_team_id`),
  CONSTRAINT `users_current_team_id_foreign` FOREIGN KEY (`current_team_id`) REFERENCES `teams` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table oficina_mecanica_fan.users: ~5 rows (approximately)
DELETE FROM `users`;
INSERT INTO `users` (`id`, `name`, `email`, `phone`, `patent`, `taxid`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`, `current_team_id`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
	(1, 'Claudio da Silva', 'hsonhi@yandex.com', 923526363, 'Brigadeiro', '00045038LA036', NULL, '$2y$12$AQxtuRvotg7Pba/rWlBq3.2txvXudUAbWs8fQ8FcIrlvikrVCJs2a', NULL, NULL, NULL, 7, 'administrador', '4iv3viqb7ul02TrAmwWOaqmwDqE1A5yslXGBUiYG5pVzfXy2oOPtPK65Z6nk', '2026-09-06 05:53:26', '2026-09-10 09:22:43'),
	(26, 'Fernando de Souza Pedro Neto', 'titryout5@gmail.com', 923254152, 'Major', '00045047LA078', NULL, '$2y$12$g3DWuH9k/Y3F2tRUwXfE/.Ws7d5jeGunvtx/GTvzwivJIJRU2TB0u', NULL, NULL, NULL, 8, 'recepcionista', NULL, '2026-09-09 21:22:19', '2026-09-10 08:31:38');

-- Dumping structure for table oficina_mecanica_fan._aeronaves
CREATE TABLE IF NOT EXISTS `_aeronaves` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chassi` varchar(64) NOT NULL,
  `ano` int NOT NULL,
  `marca` varchar(255) NOT NULL,
  `modelo` varchar(255) NOT NULL,
  `cor` varchar(64) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `chassi` (`chassi`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table oficina_mecanica_fan._aeronaves: ~2 rows (approximately)
DELETE FROM `_aeronaves`;
INSERT INTO `_aeronaves` (`id`, `chassi`, `ano`, `marca`, `modelo`, `cor`, `created_at`, `updated_at`) VALUES
	(2, 'D2-2785', 2019, 'JetRanger', 'Bell 206', 'Branca', '2026-09-08 12:09:29', '2026-09-10 08:36:15'),
	(3, 'D2-EV748', 2015, 'Huey', 'Bell UH-1', 'Cinza', '2026-09-09 10:23:05', '2026-09-10 08:35:11'),
	(4, 'D2-EPJ', 2013, 'Robinson', 'R44', 'Branca', '2026-09-10 08:35:55', '2026-09-10 08:36:06');

-- Dumping structure for table oficina_mecanica_fan._material
CREATE TABLE IF NOT EXISTS `_material` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `descricao` varchar(4000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `valor` decimal(18,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table oficina_mecanica_fan._material: ~5 rows (approximately)
DELETE FROM `_material`;
INSERT INTO `_material` (`id`, `nome`, `descricao`, `valor`, `created_at`, `updated_at`) VALUES
	(24, 'Fibras de vidro', 'O reparo de componentes em fibra de vidro em aeronaves (como carenagens e pás de helicópteros) exige materiais de alta especificação técnica e controle rigoroso de qualidade aeronáutica.', 22500.00, '2026-09-07 14:37:50', '2026-09-10 08:39:03'),
	(27, 'Resinas e adesivos estruturais', 'Compostos de colagem a vácuo para reparo de pás e painéis.', 55000.00, '2026-09-07 15:18:37', '2026-09-10 08:39:27'),
	(40, 'Fixadores e ferragens', 'Rebites, parafusos de alta resistência e porcas de aviação.', 34000.00, '2026-09-10 08:40:16', '2026-09-10 08:40:16'),
	(41, 'Selantes e tintas', 'Produtos de acabamento e vedação para evitar infiltrações e corrosão.', 78000.00, '2026-09-10 08:40:41', '2026-09-10 08:40:41');

-- Dumping structure for table oficina_mecanica_fan._mecanicos
CREATE TABLE IF NOT EXISTS `_mecanicos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `telefone` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `telefone` (`telefone`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table oficina_mecanica_fan._mecanicos: ~3 rows (approximately)
DELETE FROM `_mecanicos`;
INSERT INTO `_mecanicos` (`id`, `nome`, `telefone`, `created_at`, `updated_at`) VALUES
	(10, 'Jeremias Santos de Almeida', 956418596, '2026-09-08 13:54:54', '2026-09-10 08:32:41'),
	(11, 'Claudio Jorge Gola de Moises', 921457896, '2026-09-08 16:15:09', '2026-09-10 08:32:34'),
	(12, 'Pedro Garçia da Silva', 947528741, '2026-09-08 16:15:17', '2026-09-10 08:33:01');

-- Dumping structure for table oficina_mecanica_fan._servicos
CREATE TABLE IF NOT EXISTS `_servicos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL DEFAULT '0',
  `aeronave_id` int NOT NULL,
  `data_inicio` date NOT NULL,
  `data_fim` date NOT NULL,
  `descricao` varchar(4000) NOT NULL DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `aeronave_id` (`aeronave_id`) USING BTREE,
  KEY `utilizador_id` (`user_id`) USING BTREE,
  CONSTRAINT `servico_aeronave_id` FOREIGN KEY (`aeronave_id`) REFERENCES `_aeronaves` (`id`),
  CONSTRAINT `servico_utilizador_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table oficina_mecanica_fan._servicos: ~3 rows (approximately)
DELETE FROM `_servicos`;
INSERT INTO `_servicos` (`id`, `user_id`, `aeronave_id`, `data_inicio`, `data_fim`, `descricao`, `created_at`, `updated_at`) VALUES
	(16, 1, 2, '2026-02-01', '2026-02-01', 'ds', '2026-09-08 16:43:24', '2026-09-08 16:43:24'),
	(21, 1, 2, '2026-08-30', '2026-09-16', 'hg', '2026-09-08 20:09:33', '2026-09-08 20:09:33'),
	(22, 26, 3, '2026-09-07', '2026-09-11', 'O termo intervenção de aeronaves refere-se a qualquer ação técnica, operacional ou legal realizada em uma aeronave. Dependendo do contexto da aviação, o termo possui dois significados principais:\n1. Intervenção Técnica (Manutenção Aeronáutica)É o conjunto de procedimentos executados na estrutura ou nos componentes de um avião para garantir a sua aeronavegabilidade contínua. Toda intervenção visa restaurar ou manter as condições originais de segurança. Elas dividem-se em: [1] (https://hangarmma.com.br/blog/tipos-de-manutencao-de-aeronaves/) Preventiva: Inspeções, trocas de peças por tempo de uso ou testes programados para evitar falhas em voo.Corretiva: Reparos imediatos realizados após a detecção de uma pane ou avaria no solo.Preditiva: Uso de dados digitais do avião para prever e corrigir anomalias antes que elas aconteçam.Grandes Intervenções (Overhaul / Check D): Desmontagem e revisão completa da aeronave de tempos em tempos.\n2. Intervenção Operacional e de Soberania (Interceptação)No âmbito do controle de tráfego aéreo e defesa, a intervenção acontece quando uma aeronave viola regras do espaço aéreo ou apresenta atitudes suspeitas. [1] (https://www.decea.mil.br/index.cfm?i=utilidades&p=glossario&single=2173)Ação militar: Caças da Força Aérea interceptam e fazem uma intervenção visual para identificar, desviar ou, em casos extremos e autorizados por lei, forçar o pouso da aeronave infratora.Ação de órgãos reguladores: Fiscalizações em solo por entidades como a ANAC (no Brasil ou em Angola) que podem interditar temporariamente um avião por irregularidades em documentos ou falhas críticas de segurança.', '2026-09-08 21:21:24', '2026-09-10 08:27:05');

-- Dumping structure for table oficina_mecanica_fan._servicos_material
CREATE TABLE IF NOT EXISTS `_servicos_material` (
  `id` int NOT NULL AUTO_INCREMENT,
  `servico_id` int NOT NULL,
  `material_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `servico_ordem_material_id` (`material_id`),
  KEY `servico_ordem_servico_id` (`servico_id`),
  CONSTRAINT `servico_ordem_material_id` FOREIGN KEY (`material_id`) REFERENCES `_material` (`id`),
  CONSTRAINT `servico_ordem_servico_id` FOREIGN KEY (`servico_id`) REFERENCES `_servicos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table oficina_mecanica_fan._servicos_material: ~6 rows (approximately)
DELETE FROM `_servicos_material`;
INSERT INTO `_servicos_material` (`id`, `servico_id`, `material_id`) VALUES
	(7, 16, 24),
	(8, 16, 27),
	(15, 21, 24),
	(16, 21, 27),
	(17, 22, 27),
	(18, 22, 24);

-- Dumping structure for table oficina_mecanica_fan._servicos_mecanicos
CREATE TABLE IF NOT EXISTS `_servicos_mecanicos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `servico_id` int NOT NULL,
  `mecanicos_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `servico_mecanico_servico_id` (`servico_id`),
  KEY `servico_mecanico_mecanicos_id` (`mecanicos_id`),
  CONSTRAINT `servico_mecanico_mecanicos_id` FOREIGN KEY (`mecanicos_id`) REFERENCES `_mecanicos` (`id`),
  CONSTRAINT `servico_mecanico_servico_id` FOREIGN KEY (`servico_id`) REFERENCES `_servicos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table oficina_mecanica_fan._servicos_mecanicos: ~6 rows (approximately)
DELETE FROM `_servicos_mecanicos`;
INSERT INTO `_servicos_mecanicos` (`id`, `servico_id`, `mecanicos_id`) VALUES
	(7, 16, 10),
	(8, 16, 11),
	(9, 16, 12),
	(15, 21, 10),
	(18, 22, 11),
	(19, 22, 12);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
