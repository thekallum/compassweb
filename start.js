const { spawn } = require("child_process");
const fs = require("fs");

const env = { ...process.env };

console.log("--> Iniciando script de wrapper do Compass Web...");

if (fs.existsSync(".env")) {
  try {
    const content = fs.readFileSync(".env", "utf-8");
    const lines = content.split(/\r?\n/);
    
    lines.forEach(line => {
      if (!line || line.trim().startsWith("#")) return;
      
      const idx = line.indexOf("=");
      if (idx === -1) return;
      
      const key = line.slice(0, idx).trim();
      let val = line.slice(idx + 1).trim();
      
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      
      if (!env[key]) {
        env[key] = val;
      }
    });
    console.log("--> Arquivo .env lido com sucesso.");
  } catch (err) {
    console.error("--> Erro ao ler .env:", err);
  }
} else {
  console.log("--> Arquivo .env não encontrado (usando apenas variáveis de ambiente).");
}

const args = ["--port", env.PORT || "8080", "--host", "0.0.0.0"];

if (env.CW_MONGO_URI) {
  args.push("--mongo-uri", env.CW_MONGO_URI);
} else {
  console.error("ERRO CRITICO: CW_MONGO_URI não definida!");
  process.exit(1);
}

if (env.CW_BASIC_AUTH_USERNAME && env.CW_BASIC_AUTH_PASSWORD) {
  console.log(`--> Modo Seguro: Login ativado para usuário '${env.CW_BASIC_AUTH_USERNAME}'`);
  args.push("--basic-auth-username", env.CW_BASIC_AUTH_USERNAME);
  args.push("--basic-auth-password", env.CW_BASIC_AUTH_PASSWORD);
} else {
  console.log("--> Aviso: Rodando em modo público (sem senha de acesso ao site).");
}

console.log("--> Executando compass-web...");
const child = spawn("compass-web", args, { stdio: "inherit", env: env });

child.on("close", (code) => {
  console.log(`--> Processo encerrado com código ${code}`);
  process.exit(code);
});