class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: "savana", tamanho: 10, animais: [{ especie: "MACACO", quantidade: 3 }] },
        { numero: 2, bioma: "floresta", tamanho: 5, animais: [] },
        { numero: 3, bioma: "savana e rio", tamanho: 7, animais: [{ especie: "GAZELA", quantidade: 1 }] },
        { numero: 4, bioma: "rio", tamanho: 8, animais: [] },
        { numero: 5, bioma: "savana", tamanho: 9, animais: [{ especie: "LEAO", quantidade: 1 }] },
      ];

      this.animais = {
        LEAO: { tamanho: 3, biomas: ["savana"], carnivoro: true },
        LEOPARDO: { tamanho: 2, biomas: ["savana"], carnivoro: true },
        CROCODILO: { tamanho: 3, biomas: ["rio"], carnivoro: true },
        MACACO: { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
        GAZELA: { tamanho: 2, biomas: ["savana"], carnivoro: false },
        HIPOPOTAMO: { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false }
      };
    }
  
    analisaRecintos(animal, quantidade) {
      
      if (!this.animais[animal]) {
        return { erro: "Animal inválido" };
      }
  
     
      if (quantidade <= 0) {
        return { erro: "Quantidade inválida" };
      }
  
      const especieInfo = this.animais[animal];
      const tamanhoNecessario = especieInfo.tamanho * quantidade;
      let recintosViaveis = [];
  
      
      for (let recinto of this.recintos) {
        let espacoOcupado = 0;
        let possuiCarnivoro = false;
        let possuiHerbivoro = false;
        let especiesPresentes = new Set();
  
        
        const biomaRecinto = recinto.bioma.includes('e') ? recinto.bioma.split(' e ') : [recinto.bioma];
        if (!biomaRecinto.some(bioma => especieInfo.biomas.includes(bioma))) {
          continue; 
        }
  
        
        for (let animalPresente of recinto.animais) {
          let infoAnimalPresente = this.animais[animalPresente.especie];
          espacoOcupado += infoAnimalPresente.tamanho * animalPresente.quantidade;
          especiesPresentes.add(animalPresente.especie);
  
          
          if (infoAnimalPresente.carnivoro) {
            possuiCarnivoro = true;
          } else {
            possuiHerbivoro = true;
          }
        }
  
        
        if (especieInfo.carnivoro && (possuiHerbivoro || (possuiCarnivoro && !especiesPresentes.has(animal)))) {
          continue;
        }
  
        
        if (animal === "HIPOPOTAMO" && recinto.bioma !== "savana e rio") {
          continue;
        }
  
       
        if (animal === "MACACO" && recinto.animais.length === 0 && quantidade === 2) {
          continue;
        }
  
        
        let espacoTotalNecessario = tamanhoNecessario + espacoOcupado;
        if (especiesPresentes.size > 0 && !especiesPresentes.has(animal)) {
          espacoTotalNecessario += 1; 
        }
  
        
        if (espacoTotalNecessario <= recinto.tamanho) {
          let espacoLivre = recinto.tamanho - espacoTotalNecessario;
          recintosViaveis.push({
            numero: recinto.numero,
            descricao: `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`
          });
        }
      }
  
      
      if (recintosViaveis.length === 0) {
        return { erro: "Não há recinto viável" };
      }
  
      
      recintosViaveis.sort((a, b) => a.numero - b.numero);
  
    
      return { recintosViaveis: recintosViaveis.map(r => r.descricao) };
    }
  }
  
  export { RecintosZoo as RecintosZoo };
  