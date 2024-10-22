def hash_cpf(cpf):
    cpf_byte = cpf.encode('utf-8')
    sal = bcrypt.gensalt()
    cpf_hash = bcrypt.hashpw(cpf_byte, sal)
    print(cpf_hash)
    return cpf_hash

def hashSenha(senha):
        senha_byte = senha.encode('utf-8')
        sal = bcrypt.gensalt()
        senha_hash = bcrypt.hashpw(senha_byte, sal)
        return senha_hash

def verificar_cpf_cadastro(cpf, cpf_hash): # verifica se o cpf é igual
    if bcrypt.checkpw(cpf.encode('utf-8'), cpf_hash):
        return True
    else:
        cpf_byte = cpf.encode('utf-8')
        sal = bcrypt.gensalt()
        cpf_hash = bcrypt.hashpw(cpf_byte, sal)
        print(cpf_hash)
        administrador_banco.cpf    = cpf_hash
        return

def verificar_cpf_login(cpf, cpf_hash): # verifica se o cpf é igual
    if bcrypt.checkpw(cpf.encode('utf-8'), cpf_hash):
        return True
    else: 
        return False