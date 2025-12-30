const player1 = {
    NOME: "Mario",
    VELOCIDADE: 10,
    MANOBRILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

async function rollDice(params) {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock(params) {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }
    return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 jogar um dado de ${block} ${diceResult} + ${attribute}  = ${diceResult + attribute} \n`);
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round} começando... \n`);

        let block = await getRandomBlock();
        console.log(`🛣️ Bloco sorteado: ${block} \n`);

        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
        }

        if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + character1.MANOBRILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRILIDADE;
            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRILIDADE);
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRILIDADE);
        }

        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            console.log(`${character1.NOME} confronto com ${character2.NOME} ! 🥊`);

            await logRollResult(
                character1.NOME,
                 "poder",
                  diceResult1, 
                  character1.PODER);
            await logRollResult(
                character2.NOME,
                 "poder", 
                 diceResult2, 
                 character2.PODER);

                 // if combinado para subtrair pontos em caso de vitória no confronto
                 
                 
                 if(powerResult1 > powerResult2 && character2.PONTOS > 0){
                    console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perde 1 ponto!☐𓆉\n`);
                    
                     character2.PONTOS --;
                 }
                 if(powerResult2 > powerResult1 && character1.PONTOS > 0){
                    console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perde 1 ponto!𓆉 \n`);
                    
                     character1.PONTOS --;
                 }


                /* if Ternário para subtrair pontos em caso de vitória no confronto
                 character2.PONTOS -= 
                 powerResult1 > powerResult2 && character2.PONTOS > 0 ? 1 : 0;

                 character1.PONTOS -= 
                 powerResult2 > powerResult1 && character1.PONTOS > 0 ? 1 : 0;

                 console.log(powerResult2 === powerResult1 ? "🤝 Empate no confronto! Ninguém perde pontos!\n" : "");*/
                 
           

            
        }

        // Determinar o vencedor (movido para fora do bloco IF CONFRONTO para funcionar em todos)
        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`🏆 ${character1.NOME} marcou um ponto!\n`);
            character1.PONTOS++;
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`🏆 ${character2.NOME} marcou um ponto!\n`);
            character2.PONTOS++;
        }

        console.log("------------------------------");
    } // Fechamento do loop FOR
} // Fechamento da função playRaceEngine

async function declareWinner(character1, character2) {
    console.log(`🏁🚨 Corrida finalizada! \n`);
    console.log(`${character1.NOME}: ${character1.PONTOS} pontos \n`);
    console.log(`${character2.NOME}: ${character2.PONTOS} pontos \n`);
    
    if (character1.PONTOS > character2.PONTOS) {
        console.log(`🎉🏆 ${character1.NOME} é o grande vencedor da corrida! Parabéns! 🏆🎉`);
    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`🎉🏆 ${character2.NOME} é o grande vencedor da corrida! Parabéns! 🏆🎉`);
    } else {
        console.log(`🤝 A corrida terminou em empate! Ambos os corredores são incríveis! 🤝`);
    }
}

(async function main(params) {
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n`);
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();