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
    sg_uf VARCHAR(2) PRIMARY KEY,
    nm_estado VARCHAR(70) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS tb_cidade (
    cd_cidade INT AUTO_INCREMENT PRIMARY KEY,
    nm_cidade VARCHAR(70) NOT NULL,
    sg_uf VARCHAR(2) NOT NULL,
    CONSTRAINT fk_estado_cidade
        FOREIGN KEY (sg_uf) 
            REFERENCES tb_estado(sg_uf) 
                ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS db_biblioteca.tb_pessoa (
	cd_pessoa INT AUTO_INCREMENT PRIMARY KEY,
	nm_pessoa VARCHAR(55) NOT NULL,
	cd_cpf VARCHAR(14) NOT NULL UNIQUE,
	dt_nascimento DATE NOT NULL,
    nm_logradouro VARCHAR(200) NOT NULL,
    vl_numero INT NOT NULL,
    nm_referencia VARCHAR(200) NOT NULL,
    cd_cidade INT NOT NULL,
	ic_ativo BOOLEAN DEFAULT 1,
    CONSTRAINT fk_cidade_pessoa
        FOREIGN KEY (cd_cidade) 
            REFERENCES tb_cidade(cd_cidade) 
                ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS db_biblioteca.tb_livro (
	cd_livro INT AUTO_INCREMENT PRIMARY KEY,
	nm_livro VARCHAR(55) NOT NULL,
	dt_lancamento DATE NOT NULL,
	cd_isbn VARCHAR(13) NOT NULL,
	cd_autor INT NOT NULL,
	ic_ativo BOOLEAN DEFAULT 1,
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
	ic_ativo BOOLEAN DEFAULT 1,
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

INSERT INTO tb_estado (sg_uf, nm_estado) VALUES
('AC', 'Acre'),
('AL', 'Alagoas'),
('AP', 'Amapá'),
('AM', 'Amazonas'),
('BA', 'Bahia'),
('CE', 'Ceará'),
('DF', 'Distrito Federal'),
('ES', 'Espírito Santo'),
('GO', 'Goiás'),
('MA', 'Maranhão'),
('MT', 'Mato Grosso'),
('MS', 'Mato Grosso do Sul'),
('MG', 'Minas Gerais'),
('PA', 'Pará'),
('PB', 'Paraíba'),
('PR', 'Paraná'),
('PE', 'Pernambuco'),
('PI', 'Piauí'),
('RJ', 'Rio de Janeiro'),
('RN', 'Rio Grande do Norte'),
('RS', 'Rio Grande do Sul'),
('RO', 'Rondônia'),
('RR', 'Roraima'),
('SC', 'Santa Catarina'),
('SP', 'São Paulo'),
('SE', 'Sergipe'),
('TO', 'Tocantins');

INSERT INTO db_biblioteca.tb_adminstrador
(nm_adm, cd_cpf, nm_email, nm_senha, dt_nascimento)
VALUES('Admin', '13629966020', 'admin@gmail.com', '6ecb9250e6494db20a31306ab4f6d343', '1911-10-03');
-- Senha: test