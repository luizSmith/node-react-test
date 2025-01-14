CREATE DATABASE db_biblioteca;

use db_biblioteca;

CREATE TABLE IF NOT EXISTS db_biblioteca.tb_adm (
	cd_adm INT AUTO_INCREMENT PRIMARY KEY,
	nm_adm VARCHAR(55) NOT NULL,
	cd_cpf VARCHAR(14) UNIQUE NOT NULL,
	nm_email VARCHAR(80) NOT NULL,
	nm_senha VARCHAR(80) NOT NULL,
	dt_nascimento DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS db_teste_biblioteca.tb_autor (
	cd_autor INT AUTO_INCREMENT PRIMARY KEY,
	nm_autor VARCHAR(55) NOT NULL
);

CREATE TABLE IF NOT EXISTS db_biblioteca.tb_pessoa (
	cd_pessoa INT AUTO_INCREMENT PRIMARY KEY,
	nm_pessoa VARCHAR(55) NOT NULL,
	cd_cpf VARCHAR(14) NOT NULL UNIQUE,
	dt_nascimento DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS db_biblioteca.tb_livro (
	cd_livro INT AUTO_INCREMENT PRIMARY KEY,
	nm_livro VARCHAR(55) NOT NULL,
	dt_lancamento DATE NOT NULL,
	cd_autor INT NOT NULL,
	CONSTRAINT fk_livro_autor
		FOREIGN KEY(cd_autor)
			REFERENCES tb_autor(cd_autor)
				ON DELETE CASCADE
 				ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS db_biblioteca.tb_copia_livro (
	cd_copia INT AUTO_INCREMENT PRIMARY KEY,
	cd_livro INT NOT NULL,
	dt_estoque DATE NOT NULL,
	CONSTRAINT fk_copia_livro
		FOREIGN KEY(cd_livro)
			REFERENCES tb_livro(cd_livro)
				ON DELETE CASCADE
 				ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS db_biblioteca.tb_aluguel (
	cd_aluguel INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	dt_retirada DATETIME NOT NULL,
	dt_prazo DATE NOT NULL,
	dt_devolucao DATETIME DEFAULT NULL,
	cd_pessoa INT NOT NULL,
	cd_copia INT NOT NULL,
	CONSTRAINT fk_aluguel_pessoa
		FOREIGN KEY(cd_pessoa)
			REFERENCES tb_pessoa(cd_pessoa)
				ON DELETE CASCADE
 				ON UPDATE CASCADE,
	CONSTRAINT fk_aluguel_copia_livros
		FOREIGN KEY(cd_copia)
			REFERENCES tb_copia_livro(cd_copia)
				ON DELETE CASCADE
 				ON UPDATE CASCADE
);