import React from "react";
import { StyleSheet, Text, View, Animated} from 'react-native';
import MenuButton from "./MenuButton";
import Bubble from "./Bubble";
import {LinearGradient} from 'expo-linear-gradient';

export default function App() {

  const [phase, setPhase] = React.useState("menu");
  const [fishType, setFishType] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [randomFishes, setRandomFishes] = React.useState([]);
  const [results, setResults] = React.useState([]);
  const [resultText, setResultText] = React.useState("");
  const [calculatePrices, setCalculatePrices] = React.useState(true);
  const [animations, setAnimations] = React.useState(true);

  const prices = {
    Hauki: 1,
    Lohi: 2,
    Kuha: 2,
    Taimen: 3,
  }

  const tekstit = [
    "Kalaa tuli!",
    "Onnistunut reissu!",
    "Kaikkea sitä!",
    "Tämmöistä tällä kertaa.",
    "Kala oli syönnillään.",
    "Kannatti lähteä!",
    "Putosin järveen!",
    "Tuliko kalaa?"
  ];

  const HAUKI =  [-1, -1, -1, 
                  0, 0, 0, 0, 0, 0, 0, 0, 
                  2, 2, 2, 2, 2, 2, 2,
                  3, 3, 3, 3, 3,
                  4, 4, 4, 4, 
                  5, 5, 5, 5, 
                  6, 6, 6, 
                  7, 7, 7, 
                  8, 8, 8, 8, 
                  9, 9, 9, 
                  10, 10, 10,
                  12, 12, 12,  
                  14, 14, 16,
                  17, 18];
  
  const LOHI =   [-1, -1, -1, 
                  0, 0, 0, 0, 0, 0,
                  3, 3, 3, 3, 3, 3,
                  4, 4, 4, 4, 4,
                  6, 6, 6, 6, 6,
                  8, 8, 8, 8, 8, 8,
                  9, 9, 9, 
                  10, 10, 10, 10, 
                  12, 12, 12, 
                  14, 14, 14,
                  16, 16, 
                  19, 
                  20, 21, 22, 24];

  const TAIMEN = [-1, -1, -1, 
                  0, 0, 0, 0, 0, 0, 0, 0,
                  1, 1, 1, 1,
                  2, 2, 2, 2, 2, 2,
                  3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                  4, 4, 4, 4, 
                  5, 5, 5, 
                  6, 6, 
                  7, 
                  8, 8, 
                  9, 9,
                  10, 10];



  const KUHA =   [-1, -1, -1, 
                  0, 0, 0, 0, 0, 0, 0, 0,
                  1, 1, 1, 1,
                  2, 2, 2, 2, 2, 2,
                  3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                  4, 4, 4, 4, 
                  5, 5, 5, 
                  6, 6, 
                  7, 
                  8, 8, 
                  9, 9,
                  10, 10];


  function getFish() {
    let fish = null;

    if (fishType === "Lohi")
      fish = LOHI;
    else if (fishType === "Hauki")
      fish = HAUKI;
    else if (fishType === "Taimen")
      fish = TAIMEN;
    else if (fishType === "Kuha")
      fish = KUHA;

    if(fish === null)
      return;

    for (let i=0; i<fish.length; i++) {
      //Change fish[i] with fish[random()]
      let a = fish[i];
      let bi = Math.floor(Math.random() * fish.length);
      let b = fish[bi];

      fish[bi] = a;
      fish[i] = b;
    }
    
    setRandomFishes(fish);
    setAmount(1);
    setResults([fish[0]]);
    setResultText(tekstit[Math.floor(Math.random() * tekstit.length)]);
    setPhase("results");
  }

  function addFish() {
    if(amount < randomFishes.length) {
      setResults([...results, randomFishes[amount]]);
      setAmount(amount + 1);
    }
  }

  function newGame() {
    setFishType("");
    setAmount(0);
    setRandomFishes([]);
    setResults([]);
  }

  function goBack() {
    if (phase === "select") {
      setPhase("menu");
      newGame();
    }
    else if (phase === "results") {
      setPhase("select");
      setAmount(0);
      setRandomFishes([]);
      setResults([]);
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

    {phase === "menu" && <LinearGradient colors={['#4c669f', '#0a173b']} style={styles.container}>
      <View style={styles.ui}>
        <Text style={styles.header}>Kalastuspeli</Text> 

        <MenuButton title="Pelaa" onPress={() => setPhase("select")}/>
        <MenuButton title="Asetukset" onPress={() => setPhase("options")}/>
      </View>
    </LinearGradient> }


    {phase === "options" && <LinearGradient colors={['#4c669f', '#0a173b']} style={styles.container}>
      <View style={styles.ui}>
        <Text style={styles.header}>Asetukset</Text>

        <Text style={styles.text}>Näytä kalojen hinta: </Text>
        <View style={styles.buttonRow}>
          <MenuButton title="Kyllä" selected={calculatePrices ? true : false} onPress={() => setCalculatePrices(true)}/>
          <MenuButton title="Ei" selected={calculatePrices ? false : true} onPress={() => setCalculatePrices(false)}/>
        </View>

        <View style={styles.space}></View>

        <Text style={styles.text}>Näytä animaatio: </Text>
        <View style={styles.buttonRow}>
          <MenuButton title="Kyllä" selected={animations ? true : false} onPress={() => setAnimations(true)}/>
          <MenuButton title="Ei" selected={animations ? false : true} onPress={() => setAnimations(false)}/>
        </View>

        <View style={styles.space}></View>

        <MenuButton title="Takaisin" onPress={() => setPhase("menu")}/>
      </View>
    </LinearGradient>}



    {phase === "select" && <LinearGradient colors={['#4c669f', '#0a173b']} style={styles.container}>
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

      <View style={styles.space}></View>

      <MenuButton title="Kalasta" selected={fishType === "" ? false : true} disabled={fishType === "" ? true : false} onPress={getFish}/>
      <MenuButton title="Takaisin" selected={false} onPress={goBack}/>
    </LinearGradient>}



    {phase === "results" && <LinearGradient colors={['#4c669f', '#0a173b']} style={styles.container}>
      <View style={styles.space}></View>
      <Text style={styles.header2}>{resultText}</Text>

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

      {amount < 7 ? 
        <MenuButton title="Kalasta" selected={true} onPress={addFish}/>
        :
        <Text style={styles.text}>Et voi kalastaa enempää</Text>
      }
      <MenuButton title="Takaisin" selected={false} onPress={goBack}/>
    </LinearGradient>}

    {animations && <>
      <Bubble />
      <Bubble />
      <Bubble />
      <Bubble />
      <Bubble />
      <Bubble />
      <Bubble />
      <Bubble />
      <Bubble />
      <Bubble />
      <Bubble />   
    </>}

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003663',
    alignItems: 'center',
  },
  ui: {
    flex: 1,
    alignItems: "center",
    position: "relative",
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
  },
  header2:{
    fontSize: 24, 
    color: "white",
    padding: 20,
  },

  text: {
    fontFamily: "monospace",
    fontSize: 18,
    textTransform: "none",
    textAlign: "center",
    color: "white",
    marginBottom: 5,
  },

});
