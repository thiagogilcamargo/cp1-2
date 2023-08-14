document.addEventListener("DOMContentLoaded", function() {
    // Passo 1: Criar um array de salários original
    const salarios = [1500, 2200, 1800, 2500, 1900, 2100, 3000, 2800, 1700, 2300];
  
    // Passo 2: Usar o método map() para aplicar os aumentos aos salários
    const salariosAtualizados = salarios.map(salario => {
      if (salario <= 2000) {
        // Aumento de 15% para salários até 2000
        return salario * 1.15;
      } else {
        // Aumento de 10% para salários acima de 2000
        return salario * 1.1;
      }
    });
  
    // Passo 3: Usar o método filter() para selecionar os salários superiores a 2500
    const salariosSuperiores2500 = salariosAtualizados.filter(salario => salario > 2500);
  
    // Passo 4: Usar o método reduce() para somar os salários superiores a 2500
    const somaSalariosSuperiores2500 = salariosSuperiores2500.reduce((acumulador, salario) => acumulador + salario, 0);
  
    // Exibir os resultados na página
    const salariosOriginaisDiv = document.getElementById("salarios-originais");
    const salariosAtualizadosDiv = document.getElementById("salarios-atualizados");
    const salariosSuperioresDiv = document.getElementById("salarios-superiores");
    const somaSalariosDiv = document.getElementById("soma-salarios");
  
    salariosOriginaisDiv.innerHTML = `<p>Salários originais: ${formatarValores(salarios)}</p>`;
    salariosAtualizadosDiv.innerHTML = `<p>Salários atualizados: ${formatarValores(salariosAtualizados)}</p>`;
    salariosSuperioresDiv.innerHTML = `<p>Salários superiores a 2500: ${formatarValores(salariosSuperiores2500)}</p>`;
    somaSalariosDiv.innerHTML = `<p>Soma dos salários superiores a 2500: ${formatarDinheiro(somaSalariosSuperiores2500)}</p>`;
    
    function formatarValores(valores) {
      return valores.map(valor => formatarDinheiro(valor)).join(', ');
    }
  
    function formatarDinheiro(valor) {
      return `R$ ${valor.toFixed(2)}`;
    }
  });
  
  
  