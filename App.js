import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import MenuButton from "./MenuButton";

export default function App() {

  const [phase, setPhase] = React.useState("menu");
  const [fishType, setFishType] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [results, setResults] = React.useState([]);
  const [calculatePrices, setCalculatePrices] = React.useState(false);

  const prices = {
    Hauki: 2,
    Lohi: 5,
    Kuha: 5,
    Taimen: 8,
  }

  const HAUKI = [-1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 4, 4, 4, 5, 5, 6, 6, 6, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 10, 10, 10, 10, 10, 10, 12, 12, 12, 12, 14, 14, 14, 16, 16, 17, 18];
  
  const LOHI = [0, 4, 8, 9, 10, 14, 21,
                0, 4, 8, 9, 10, 14, 22,
                0, 4, 8, 9, 12, 14, 24,
                0, 4, 8, 10, 12, 16, -1,
                0, 6, 8, 10, 12, 16, -1,
                0, 6, 8, 10, 12, 19, -1,
                0, 6, 8, 10, 14, 20,
                0, 8, 8];

  const TAIMEN = [0, 1, 2, 3, 4, 6, 10,
                  0, 1, 2, 3, 4, 6, 10,
                  0, 1, 3, 3, 4, 7, -1,
                  0, 1, 3, 3, 4, 8, -1,
                  0, 2, 3, 3, 5, 8, -1,
                  0, 2, 3, 3, 5, 9, 
                  0, 2, 3, 3, 5, 9,
                  0, 2, 3];

  const KUHA = [0, 1, 2, 3, 4, 6, 10,
                0, 1, 2, 3, 4, 6, 10,
                0, 1, 3, 3, 4, 7, -1,
                0, 1, 3, 3, 4, 8, -1,
                0, 2, 3, 3, 5, 8, -1,
                0, 2, 3, 3, 5, 9, 
                0, 2, 3, 3, 5, 9,
                0, 2, 3];


  function getFish() {
    let type = null;
    if (fishType === "Lohi")
      type = LOHI;
    else if (fishType === "Hauki")
      type = HAUKI;
    else if (fishType === "Taimen")
      type = TAIMEN;
    else if (fishType === "Kuha")
      type = KUHA;

    if(type === null)
      return;

    let fish = [];
    for (let i=0; i<amount; i++) {
      fish[i] = type[Math.floor(Math.random() * type.length)];
    }
    
    setResults(fish);
    setPhase("results");
  }

  function newGame() {
    setFishType("");
    setAmount(0);
    setResults([]);
  }

  function goBack() {
    if (phase === "select") {
      setPhase("menu");
      newGame();
    }
    else if (phase === "results") {
      setPhase("select");
      newGame();
    }
  }

  function totalWeight() {
    let sum = 0;
    results.forEach((fish) => {
      if (fish !== -1)
        sum += fish;
    })
    return sum;
  }

  function totalPrice() {
    let price = 0;
    if (fishType === "Lohi")
      price = prices.Lohi;
    else if (fishType === "Hauki")
      price = prices.Hauki;
    else if (fishType === "Taimen")
      price = prices.Taimen;
    else if (fishType === "Kuha")
      price = prices.Kuha;

    let weight = totalWeight();

    return weight*price;
  }

  return ( <>
    {phase === "menu" && <View style={styles.container}>
      <Text style={styles.header}>Kalastuspeli</Text> 

      <MenuButton title="Pelaa" onPress={() => setPhase("select")}/>
      <MenuButton title="Asetukset" onPress={() => setPhase("options")}/>

    </View> }


    {phase === "options" && <View style={styles.container}>
      <Text style={styles.header}>Asetukset</Text>

      <Text style={styles.text}>Näytä kalojen hinta: </Text>
      <View style={styles.buttonRow}>
        <MenuButton title="Kyllä" selected={calculatePrices ? true : false} onPress={() => setCalculatePrices(true)}/>
        <MenuButton title="Ei" selected={calculatePrices ? false : true} onPress={() => setCalculatePrices(false)}/>
      </View>

      <MenuButton title="Takaisin" onPress={() => setPhase("menu")}/>
    </View>}



    {phase === "select" && <View style={styles.container}>
      <View style={styles.space}></View>
      <Text style={styles.header2}>Valitse kalalaji</Text>

      <View style={styles.buttonRow}>
        <MenuButton title="Lohi" selected={(fishType === "Lohi" ? true : false)} onPress={() => setFishType("Lohi")}/>
        <MenuButton title="Hauki" selected={(fishType === "Hauki" ? true : false)} onPress={() => setFishType("Hauki")}/>
      </View>
      <View style={styles.buttonRow}>
        <MenuButton title="Taimen" selected={(fishType === "Taimen" ? true : false)} onPress={() => setFishType("Taimen")}/>
        <MenuButton title="Kuha" selected={(fishType === "Kuha" ? true : false)} onPress={() => setFishType("Kuha")}/>
      </View>

      <Text style={styles.header2}>Kuinka monta kalaa aiot saada?</Text>

      <View style={styles.buttonRow}>
        <MenuButton title="1" selected={(amount === 1 ? true : false)} onPress={() => setAmount(1)}/>
        <MenuButton title="2" selected={(amount === 2 ? true : false)} onPress={() => setAmount(2)}/>
        <MenuButton title="3" selected={(amount === 3 ? true : false)} onPress={() => setAmount(3)}/>
        <MenuButton title="4" selected={(amount === 4 ? true : false)} onPress={() => setAmount(4)}/>
      </View>
      <View style={styles.buttonRow}>
        <MenuButton title="5" selected={(amount === 5 ? true : false)} onPress={() => setAmount(5)}/>
        <MenuButton title="6" selected={(amount === 6 ? true : false)} onPress={() => setAmount(6)}/>
        <MenuButton title="7" selected={(amount === 7 ? true : false)} onPress={() => setAmount(7)}/>
      </View>

      <View style={styles.space}></View>

      <MenuButton title="Kalasta" selected={fishType === "" || amount === 0 ? false : true} disabled={fishType === "" || amount === 0 ? true : false} onPress={getFish}/>
      <MenuButton title="Takaisin" selected={false} onPress={goBack}/>
    </View>}



    {phase === "results" && <View style={styles.container}>
      <View style={styles.space}></View>
      <Text style={styles.header2}>Kalaa tuli!</Text>

      {results.length !== 0 && results.map((result, index) => {
        return(
          <Text key={index} style={styles.text}>
            {result !== -1 ? fishType + ": " + result + "kg" : "Uistin jäi pohjaan!"}
          </Text>
        );
      })}

      {calculatePrices && <>
        <View style={styles.space}></View>

        <Text style={styles.text}>{"Yhteensä: " + totalWeight() + "kg"}</Text>
        <Text style={styles.text}>{"Arvo: " + totalPrice() + "€"}</Text>    
      </>}

      <View style={styles.space}></View>
      <MenuButton title="Takaisin" selected={false} onPress={goBack}/>
    </View>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003663',
    alignItems: 'center',
  },
  buttonRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  space: {
    padding: 20,
  },
  header:{
    fontSize: 24, 
    color: "white",
    padding: 100,
    marginTop: 50,
  },
  header2:{
    fontSize: 24, 
    color: "white",
    padding: 20,
  },

  text: {
    fontFamily: "monospace",
    fontSize: 16,
    textTransform: "none",
    textAlign: "center",
    color: "white",
    marginBottom: 5,
  },

});
