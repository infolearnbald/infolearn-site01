async function enviarIA() {
    const prompt = document.getElementById("prompt").value;
    const saida = document.getElementById("respostaIA");

    saida.innerText = "Pensando...";

    const req = await fetch("https://SEU-LINK-VERCEL.vercel.app/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
    });

    const res = await req.json();
    saida.innerText = res.resposta;
}

