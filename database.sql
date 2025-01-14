CREATE DATABASE db_biblioteca;

use db_biblioteca;

CREATE TABLE IF NOT EXISTS db_biblioteca.tb_adminstrador (
	cd_adm INT AUTO_INCREMENT PRIMARY KEY,
	nm_adm VARCHAR(55) NOT NULL,
	cd_cpf VARCHAR(14) UNIQUE NOT NULL,
	nm_email VARCHAR(80) NOT NULL,
	nm_senha VARCHAR(80) NOT NULL,
	dt_nascimento DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS db_biblioteca.tb_autor (
	cd_autor INT AUTO_INCREMENT PRIMARY KEY,
	nm_autor VARCHAR(55) NOT NULL
);

CREATE TABLE IF NOT EXISTS tb_estado (
    uf VARCHAR(2) PRIMARY KEY,
    nome VARCHAR(70) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS tb_cidade (
    cd_cidade INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(70) NOT NULL,
    uf VARCHAR(2) NOT NULL,
    CONSTRAINT fk_estado_cidade
        FOREIGN KEY (uf) 
            REFERENCES tb_estado(uf) 
                ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS db_biblioteca.tb_pessoa (
	cd_pessoa INT AUTO_INCREMENT PRIMARY KEY,
	nm_pessoa VARCHAR(55) NOT NULL,
	cd_cpf VARCHAR(14) NOT NULL UNIQUE,
	dt_nascimento DATE NOT NULL,
    logradouro VARCHAR(200) NOT NULL,
    numero INT NOT NULL,
    referencia VARCHAR(200) NOT NULL,
    cd_cidade INT NOT NULL,
    CONSTRAINT fk_cidade_pessoa
        FOREIGN KEY (cd_cidade) 
            REFERENCES tb_cidade(cd_cidade) 
                ON DELETE CASCADE
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