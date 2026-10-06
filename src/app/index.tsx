import { getAllInventory } from "@dataconnect/generated";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";

import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";


type InventoryItem = {
  resin: string;
  sku: string;
  location: string;
  quantity: number;
};

type Job = {
  job: string;
  resin: string;
  required: number;
  picked: number;
  status: string;
};

const DEFAULT_INVENTORY: InventoryItem[] = [
  {
    resin: "ABS Black",
    sku: "RES-ABS-BLK",
    location: "A01-01-01",
    quantity: 500,
  },
  {
    resin: "HDPE Natural",
    sku: "RES-HDPE-NAT",
    location: "A01-01-02",
    quantity: 300,
  },
  {
    resin: "Polycarbonate Clear",
    sku: "RES-PC-CLR",
    location: "A01-02-01",
    quantity: 150,
  },
];

const DEFAULT_JOBS: Job[] = [
  {
    job: "Job10101",
    resin: "ABS Black",
    required: 50,
    picked: 0,
    status: "Open",
  },
  {
    job: "Job10102",
    resin: "HDPE Natural",
    required: 75,
    picked: 0,
    status: "Open",
  },
];

export default function Index() {
  const [screen, setScreen] = useState("login");

  // LOGIN
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // INVENTORY
  const [inventory, setInventory] =
    useState<InventoryItem[]>(DEFAULT_INVENTORY);

  // JOBS
  const [jobs, setJobs] = useState<Job[]>(DEFAULT_JOBS);

  // PICK
  const [jobNumber, setJobNumber] = useState("");
  const [pickQuantity, setPickQuantity] = useState("");

  // RECEIVE
  const [receiveResin, setReceiveResin] = useState("");
  const [receiveQuantity, setReceiveQuantity] = useState("");
  const [receiveLocation, setReceiveLocation] = useState("");

  // LOOK UP
  const [search, setSearch] = useState("");
  
  //LOOK UP SCREEN 
  const [lookupResults, setLookupResults] = useState<InventoryItem[]>([]);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState("");

  // INVENTORY ADJUSTMENT
  const [adjustResin, setAdjustResin] = useState("");
  const [adjustLocation, setAdjustLocation] = useState("");
  const [adjustQuantity, setAdjustQuantity] = useState("");
  const [adjustReason, setAdjustReason] = useState("");

  // CREATE JOB
  const [createJobNumber, setCreateJobNumber] = useState("");
  const [createJobResin, setCreateJobResin] = useState("");
  const [createJobQuantity, setCreateJobQuantity] =
    useState("");

  // MESSAGES
  const [receiveMessage, setReceiveMessage] = useState("");
  const [pickMessage, setPickMessage] = useState("");
  const [adjustMessage, setAdjustMessage] = useState("");
  const [createJobMessage, setCreateJobMessage] =
    useState("");


  // LOGIN
  const login = async () => {
  const email = username.trim();

  if (email === "" || password === "") {
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);

  
    const result = await getAllInventory();


  const firebaseInventory: InventoryItem[] =
  result.data.inventories.map((item) => ({
    resin: item.resinName,
    sku: item.sku,
    location: item.warehouseLocation,
    quantity: item.quantity,
  }));

setInventory(firebaseInventory);

console.log(
  "Firebase SQL Connect inventory:",
  firebaseInventory
);

setScreen("menu");


  } catch (error) {
    console.log("Firebase login failed:", error);
  }
};

  // RECEIVE MATERIAL
  const receiveMaterial = () => {
    const resinName = receiveResin.trim();
    const location = receiveLocation.trim();
    const amount = Number(receiveQuantity);

    setReceiveMessage("");

    if (resinName === "") {
      setReceiveMessage(
        "ERROR: Enter a resin name."
      );
      return;
    }

    if (location === "") {
      setReceiveMessage(
        "ERROR: Enter a warehouse location."
      );
      return;
    }

    if (
      receiveQuantity.trim() === "" ||
      isNaN(amount) ||
      amount <= 0
    ) {
      setReceiveMessage(
        "ERROR: Enter a valid quantity."
      );
      return;
    }

    setInventory((currentInventory) => {
      const existingItem =
        currentInventory.find(
          (item) =>
            item.resin.toLowerCase() ===
              resinName.toLowerCase() &&
            item.location.toLowerCase() ===
              location.toLowerCase()
        );

      if (existingItem) {
        return currentInventory.map(
          (item) =>
            item.resin.toLowerCase() ===
                resinName.toLowerCase() &&
              item.location.toLowerCase() ===
                location.toLowerCase()
              ? {
                  ...item,
                  quantity:
                    item.quantity + amount,
                }
              : item
        );
      }

      return [
        ...currentInventory,
        {
          resin: resinName,
          sku: "RES-NEW",
          location,
          quantity: amount,
        },
      ];
    });

    setReceiveMessage(
      `RECEIVE COMPLETE\n\n` +
        `${amount} units of ${resinName}\n` +
        `Location: ${location}`
    );

    setReceiveResin("");
    setReceiveQuantity("");
    setReceiveLocation("");
  };

  // INVENTORY ADJUSTMENT
  const processAdjustment = () => {
    const resinName = adjustResin.trim();
    const location = adjustLocation.trim();
    const newQuantity = Number(adjustQuantity);
    const reason = adjustReason.trim();

    setAdjustMessage("");

    if (resinName === "") {
      setAdjustMessage(
        "ERROR: Enter a resin name."
      );
      return;
    }

    if (location === "") {
      setAdjustMessage(
        "ERROR: Enter a warehouse location."
      );
      return;
    }

    if (
      adjustQuantity.trim() === "" ||
      isNaN(newQuantity) ||
      newQuantity < 0
    ) {
      setAdjustMessage(
        "ERROR: Enter a valid physical quantity."
      );
      return;
    }

    if (reason === "") {
      setAdjustMessage(
        "ERROR: Enter an adjustment reason."
      );
      return;
    }

    const item = inventory.find(
      (inventoryItem) =>
        inventoryItem.resin.toLowerCase() ===
          resinName.toLowerCase() &&
        inventoryItem.location.toLowerCase() ===
          location.toLowerCase()
    );

    if (!item) {
      setAdjustMessage(
        `ITEM NOT FOUND\n\n` +
          `${resinName}\n` +
          `Location: ${location}`
      );
      return;
    }

    const difference =
      newQuantity - item.quantity;

    setInventory((currentInventory) =>
      currentInventory.map(
        (inventoryItem) =>
          inventoryItem.resin.toLowerCase() ===
              resinName.toLowerCase() &&
            inventoryItem.location.toLowerCase() ===
              location.toLowerCase()
            ? {
                ...inventoryItem,
                quantity: newQuantity,
              }
            : inventoryItem
      )
    );

    setAdjustMessage(
      `ADJUSTMENT COMPLETE\n\n` +
        `Resin: ${item.resin}\n` +
        `SKU: ${item.sku}\n` +
        `Location: ${item.location}\n\n` +
        `Previous Quantity: ${item.quantity}\n` +
        `Physical Quantity: ${newQuantity}\n` +
        `Adjustment: ${
          difference > 0 ? "+" : ""
        }${difference}\n\n` +
        `Reason: ${reason}`
    );

    setAdjustResin("");
    setAdjustLocation("");
    setAdjustQuantity("");
    setAdjustReason("");
  };

  // CREATE JOB
  const createJob = () => {
    const newJobNumber =
      createJobNumber.trim();

    const resinName =
      createJobResin.trim();

    const requiredQuantity =
      Number(createJobQuantity);

    setCreateJobMessage("");

    // CHECK JOB NUMBER
    if (newJobNumber === "") {
      setCreateJobMessage(
        "ERROR: Enter a Job Number."
      );
      return;
    }

    // CHECK JOB NUMBER FORMAT
    if (
      !newJobNumber
        .toLowerCase()
        .startsWith("job")
    ) {
      setCreateJobMessage(
        "ERROR: Job Number must start with Job.\n\nExample: Job10103"
      );
      return;
    }

    // CHECK FOR DUPLICATE JOB
    const jobAlreadyExists = jobs.some(
      (job) =>
        job.job.toLowerCase() ===
        newJobNumber.toLowerCase()
    );

    if (jobAlreadyExists) {
      setCreateJobMessage(
        `ERROR: ${newJobNumber} already exists.`
      );
      return;
    }

    // CHECK RESIN
    if (resinName === "") {
      setCreateJobMessage(
        "ERROR: Enter a resin name."
      );
      return;
    }

    // CHECK QUANTITY
    if (
      createJobQuantity.trim() === "" ||
      isNaN(requiredQuantity) ||
      requiredQuantity <= 0
    ) {
      setCreateJobMessage(
        "ERROR: Enter a valid required quantity."
      );
      return;
    }

    // CHECK WHETHER RESIN EXISTS
    const inventoryItem = inventory.find(
      (item) =>
        item.resin.toLowerCase() ===
        resinName.toLowerCase()
    );

    if (!inventoryItem) {
      setCreateJobMessage(
        `RESIN NOT FOUND\n\n` +
          `${resinName} does not exist in inventory.\n\n` +
          `Add the resin through RECEIVE first.`
      );
      return;
    }

    // CREATE NEW JOB
    const newJob: Job = {
      job: newJobNumber,
      resin: inventoryItem.resin,
      required: requiredQuantity,
      picked: 0,
      status: "Open",
    };

    setJobs((currentJobs) => [
      ...currentJobs,
      newJob,
    ]);

    setCreateJobMessage(
      `JOB CREATED SUCCESSFULLY\n\n` +
        `Job: ${newJob.job}\n` +
        `Resin: ${newJob.resin}\n` +
        `Required: ${newJob.required}\n` +
        `Status: Open`
    );

    setCreateJobNumber("");
    setCreateJobResin("");
    setCreateJobQuantity("");
  };

  // PICK RESIN
  const processPick = () => {
    const enteredJob =
      jobNumber.trim().toLowerCase();

    const amount = Number(pickQuantity);

    setPickMessage("");

    if (enteredJob === "") {
      setPickMessage(
        "ERROR: Enter a Job Number."
      );
      return;
    }

    if (
      pickQuantity.trim() === "" ||
      isNaN(amount) ||
      amount <= 0
    ) {
      setPickMessage(
        "ERROR: Enter a valid quantity."
      );
      return;
    }

    const job = jobs.find(
      (item) =>
        item.job.toLowerCase() ===
        enteredJob
    );

    if (!job) {
      setPickMessage(
        "JOB NOT FOUND\n\nTry Job10101 or Job10102."
      );
      return;
    }

    if (job.status === "Complete") {
      setPickMessage(
        `JOB ALREADY COMPLETE\n\n` +
          `${job.job} has already been picked.`
      );
      return;
    }

    const inventoryItem = inventory.find(
      (item) =>
        item.resin.toLowerCase() ===
        job.resin.toLowerCase()
    );

    if (!inventoryItem) {
      setPickMessage(
        `NO INVENTORY FOUND\n\n` +
          `${job.resin} could not be found in inventory.`
      );
      return;
    }

    // OVER-PICK
    if (amount > job.required) {
      setJobs((currentJobs) =>
        currentJobs.map((item) =>
          item.job === job.job
            ? {
                ...item,
                picked: amount,
                status: "Over-Pick",
              }
            : item
        )
      );

      setPickMessage(
        `OVER-PICK DETECTED\n\n` +
          `Job: ${job.job}\n` +
          `Required: ${job.required}\n` +
          `Picked: ${amount}\n` +
          `Over by: ${
            amount - job.required
          }\n\n` +
          `Location: ${inventoryItem.location}\n\n` +
          `Inventory was NOT changed.`
      );

      return;
    }

    // SHORT PICK
    if (amount < job.required) {
      setJobs((currentJobs) =>
        currentJobs.map((item) =>
          item.job === job.job
            ? {
                ...item,
                picked: amount,
                status: "Short Pick",
              }
            : item
        )
      );

      setPickMessage(
        `SHORT PICK\n\n` +
          `Job: ${job.job}\n` +
          `Required: ${job.required}\n` +
          `Picked: ${amount}\n` +
          `Still needed: ${
            job.required - amount
          }\n\n` +
          `Inventory was NOT changed.`
      );

      return;
    }

    // CORRECT PICK
    if (amount === job.required) {
      if (inventoryItem.quantity < amount) {
        setPickMessage(
          `INSUFFICIENT INVENTORY\n\n` +
            `On Hand: ${inventoryItem.quantity}\n` +
            `Required: ${amount}\n\n` +
            `Pick cannot be completed.`
        );

        return;
      }

      setJobs((currentJobs) =>
        currentJobs.map((item) =>
          item.job === job.job
            ? {
                ...item,
                picked: amount,
                status: "Complete",
              }
            : item
        )
      );

      setInventory((currentInventory) =>
        currentInventory.map((item) =>
          item.resin.toLowerCase() ===
          job.resin.toLowerCase()
            ? {
                ...item,
                quantity:
                  item.quantity - amount,
              }
            : item
        )
      );

      setPickMessage(
        `PICK COMPLETE\n\n` +
          `Job: ${job.job}\n` +
          `Resin: ${job.resin}\n` +
          `SKU: ${inventoryItem.sku}\n` +
          `Location: ${inventoryItem.location}\n` +
          `Quantity Picked: ${amount}\n\n` +
          `Inventory updated successfully.`
      );

      setJobNumber("");
      setPickQuantity("");
    }
  };


  // LOGIN SCREEN
if (screen === "login") {
  return (
    <View style={styles.container}>
      <Image
      source={require("../../assets/images/sm-logistics-logo.png")}
      style={styles.logo}
       resizeMode="contain"
       />

      <Text style={styles.subtitle}>
        Warehouse Management System
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable
        style={styles.button}
        onPress={login}
      >
        <Text style={styles.buttonText}>
          LOGIN
        </Text>
      </Pressable>

      <Text style={styles.demo}>
        Sign in with your Firebase account
      </Text>
    </View>
  );
}

// MAIN MENU
if (screen === "menu") {
  return (
    <ScrollView contentContainerStyle={styles.menuScroll}>

      <Image
        source={require("../../assets/images/sm-logistics-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>
        Main Menu
      </Text>

      <View style={styles.menuGrid}>

        <Pressable
          style={styles.menuButton}
          onPress={() => {
            setPickMessage("");
            setScreen("pick");
          }}
        >
          <Text style={styles.menuIcon}>📦</Text>
<Text style={styles.buttonText}>PICK RESIN</Text>
        </Pressable>

        <Pressable
          style={styles.menuButton}
          onPress={() => {
            setSearch("");
            setScreen("lookup");
          }}
        >
          <Text style={styles.menuIcon}>🔎</Text>
<Text style={styles.buttonText}>LOOK UP</Text>
        </Pressable>

        <Pressable
          style={styles.menuButton}
          onPress={() => {
            setAdjustMessage("");
            setScreen("adjustment");
          }}
        >
          <Text style={styles.menuIcon}>📊</Text>
<Text style={styles.buttonText}>INVENTORY ADJUSTMENT</Text>
        </Pressable>

        <Pressable
          style={styles.menuButton}
          onPress={() => {
            setCreateJobMessage("");
            setScreen("createJob");
          }}
        >
         <Text style={styles.menuIcon}>📝</Text>
<Text style={styles.buttonText}>CREATE JOB</Text>
        </Pressable>

        <Pressable
          style={styles.menuButton}
          onPress={() => {
            setReceiveMessage("");
            setScreen("receive");
          }}
        >
          <Text style={styles.menuIcon}>📥</Text>
<Text style={styles.buttonText}>RECEIVE</Text>
        </Pressable>

      </View>

      <Pressable
        style={styles.logout}
        onPress={() => setScreen("login")}
      >
        <Text style={styles.logoutText}>
          LOG OUT
        </Text>
      </Pressable>

    </ScrollView>
  );
}

  // PICK SCREEN
  if (screen === "pick") {
    const currentJob = jobs.find(
      (item) =>
        item.job.toLowerCase() ===
        jobNumber
          .trim()
          .toLowerCase()
    );

    const currentInventory =
      currentJob
        ? inventory.find(
            (item) =>
              item.resin.toLowerCase() ===
              currentJob.resin.toLowerCase()
          )
        : undefined;

    return (
      <ScrollView
        contentContainerStyle={
          styles.scroll
        }
      >
        <Text style={styles.title}>
          PICK RESIN
        </Text>

        <Text style={styles.label}>
          Job Number
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Job10101"
          value={jobNumber}
          onChangeText={setJobNumber}
          autoCapitalize="none"
        />

        {currentJob && (
          <View style={styles.card}>
            <Text
              style={styles.cardTitle}
            >
              {currentJob.job}
            </Text>

            <Text>
              Resin: {currentJob.resin}
            </Text>

            <Text>
              SKU:{" "}
              {currentInventory?.sku ||
                "Not Found"}
            </Text>

            <Text>
              Location:{" "}
              {currentInventory?.location ||
                "Not Found"}
            </Text>

            <Text>
              Required:{" "}
              {currentJob.required}
            </Text>

            <Text>
              Picked: {currentJob.picked}
            </Text>

            <Text>
              Status: {currentJob.status}
            </Text>

            <Text
              style={styles.quantity}
            >
              On Hand:{" "}
              {currentInventory?.quantity ??
                0}
            </Text>
          </View>
        )}

        <Text style={styles.label}>
          Picked Quantity
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter quantity"
          value={pickQuantity}
          onChangeText={
            setPickQuantity
          }
          keyboardType="numeric"
        />

        <Pressable
          style={styles.button}
          onPress={processPick}
        >
          <Text style={styles.buttonText}>
            PROCESS PICK
          </Text>
        </Pressable>

        {pickMessage !== "" && (
          <View style={styles.messageBox}>
            <Text
              style={
                styles.messageText
              }
            >
              {pickMessage}
            </Text>
          </View>
        )}

        <Pressable
          style={styles.back}
          onPress={() =>
            setScreen("menu")
          }
        >
          <Text>
            ← Back to Main Menu
          </Text>
        </Pressable>
      </ScrollView>
    );
  }

  // LOOK UP SCREEN
  if (screen === "lookup") {
    const results = inventory.filter(
      (item) =>
        item.resin
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.sku
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.location
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

    return (
      <ScrollView
        contentContainerStyle={
          styles.scroll
        }
      >
        <Text style={styles.title}>
          LOOK UP
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Search resin, SKU, or location"
          value={search}
          onChangeText={setSearch}
        />

        {results.length === 0 ? (
          <View style={styles.card}>
            <Text
              style={styles.cardTitle}
            >
              NO RESULTS
            </Text>

            <Text>
              No matching inventory
              was found.
            </Text>
          </View>
        ) : (
          results.map(
            (item, index) => (
              <View
                style={styles.card}
                key={`${item.sku}-${item.location}-${index}`}
              >
                <Text
                  style={
                    styles.cardTitle
                  }
                >
                  {item.resin}
                </Text>

                <Text>
                  SKU: {item.sku}
                </Text>

                <Text>
                  Location:{" "}
                  {item.location}
                </Text>

                <Text
                  style={
                    styles.quantity
                  }
                >
                  On Hand:{" "}
                  {item.quantity}
                </Text>
              </View>
            )
          )
        )}

        <Pressable
          style={styles.back}
          onPress={() =>
            setScreen("menu")
          }
        >
          <Text>
            ← Back to Main Menu
          </Text>
        </Pressable>
      </ScrollView>
    );
  }

  // INVENTORY ADJUSTMENT SCREEN
  if (screen === "adjustment") {
    const selectedItem =
      inventory.find(
        (item) =>
          item.resin
            .toLowerCase() ===
            adjustResin
              .trim()
              .toLowerCase() &&
          item.location
            .toLowerCase() ===
            adjustLocation
              .trim()
              .toLowerCase()
      );

    return (
      <ScrollView
        contentContainerStyle={
          styles.scroll
        }
      >
        <Text style={styles.title}>
          INVENTORY ADJUSTMENT
        </Text>

        <Text style={styles.subtitle}>
          ICQA / Physical Count
        </Text>

        <Text style={styles.label}>
          Resin Name
        </Text>

        <TextInput
          style={styles.input}
          placeholder="ABS Black"
          value={adjustResin}
          onChangeText={setAdjustResin}
        />

        <Text style={styles.label}>
          Warehouse Location
        </Text>

        <TextInput
          style={styles.input}
          placeholder="A01-01-01"
          value={adjustLocation}
          onChangeText={
            setAdjustLocation
          }
          autoCapitalize="characters"
        />

        {selectedItem && (
          <View style={styles.card}>
            <Text
              style={styles.cardTitle}
            >
              INVENTORY FOUND
            </Text>

            <Text>
              Resin:{" "}
              {selectedItem.resin}
            </Text>

            <Text>
              SKU:{" "}
              {selectedItem.sku}
            </Text>

            <Text>
              Location:{" "}
              {selectedItem.location}
            </Text>

            <Text
              style={
                styles.quantity
              }
            >
              System Quantity:{" "}
              {selectedItem.quantity}
            </Text>
          </View>
        )}

        <Text style={styles.label}>
          Physical Quantity
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter physical count"
          value={adjustQuantity}
          onChangeText={
            setAdjustQuantity
          }
          keyboardType="numeric"
        />

        <Text style={styles.label}>
          Reason
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Cycle count discrepancy"
          value={adjustReason}
          onChangeText={
            setAdjustReason
          }
        />

        <Pressable
          style={styles.button}
          onPress={processAdjustment}
        >
          <Text
            style={styles.buttonText}
          >
            APPLY ADJUSTMENT
          </Text>
        </Pressable>

        {adjustMessage !== "" && (
          <View style={styles.successBox}>
            <Text
              style={
                styles.successText
              }
            >
              {adjustMessage}
            </Text>
          </View>
        )}

        <Pressable
          style={styles.back}
          onPress={() =>
            setScreen("menu")
          }
        >
          <Text>
            ← Back to Main Menu
          </Text>
        </Pressable>
      </ScrollView>
    );
  }

  // CREATE JOB SCREEN
  if (screen === "createJob") {
    return (
      <ScrollView
        contentContainerStyle={
          styles.scroll
        }
      >
        <Text style={styles.title}>
          CREATE JOB
        </Text>

        <Text style={styles.subtitle}>
          Create a New Picking Job
        </Text>

        <Text style={styles.label}>
          Job Number
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Job10103"
          value={createJobNumber}
          onChangeText={
            setCreateJobNumber
          }
          autoCapitalize="none"
        />

        <Text style={styles.label}>
          Resin Name
        </Text>

        <TextInput
          style={styles.input}
          placeholder="ABS Black"
          value={createJobResin}
          onChangeText={
            setCreateJobResin
          }
        />

        <Text style={styles.label}>
          Required Quantity
        </Text>

        <TextInput
          style={styles.input}
          placeholder="100"
          value={createJobQuantity}
          onChangeText={
            setCreateJobQuantity
          }
          keyboardType="numeric"
        />

        <View style={styles.card}>
          <Text
            style={styles.cardTitle}
          >
            AVAILABLE RESINS
          </Text>

          {inventory.map(
            (item, index) => (
              <Text
                key={`${item.sku}-${item.location}-${index}`}
                style={styles.listItem}
              >
                • {item.resin}
              </Text>
            )
          )}
        </View>

        <Pressable
          style={styles.button}
          onPress={createJob}
        >
          <Text
            style={styles.buttonText}
          >
            CREATE JOB
          </Text>
        </Pressable>

        {createJobMessage !== "" && (
          <View style={styles.successBox}>
            <Text
              style={
                styles.successText
              }
            >
              {createJobMessage}
            </Text>
          </View>
        )}

        <Pressable
          style={styles.back}
          onPress={() =>
            setScreen("menu")
          }
        >
          <Text>
            ← Back to Main Menu
          </Text>
        </Pressable>
      </ScrollView>
    );
  }

  // RECEIVE SCREEN
  if (screen === "receive") {
    return (
      <ScrollView
        contentContainerStyle={
          styles.scroll
        }
      >
        <Text style={styles.title}>
          RECEIVE
        </Text>

        <Text style={styles.subtitle}>
          Add Material to Inventory
        </Text>

        <Text style={styles.label}>
          Resin Name
        </Text>

        <TextInput
          style={styles.input}
          placeholder="ABS Black"
          value={receiveResin}
          onChangeText={
            setReceiveResin
          }
        />

        <Text style={styles.label}>
          Warehouse Location
        </Text>

        <TextInput
          style={styles.input}
          placeholder="A01-01-01"
          value={receiveLocation}
          onChangeText={
            setReceiveLocation
          }
          autoCapitalize="characters"
        />

        <Text style={styles.label}>
          Quantity
        </Text>

        <TextInput
          style={styles.input}
          placeholder="100"
          value={receiveQuantity}
          onChangeText={
            setReceiveQuantity
          }
          keyboardType="numeric"
        />

        <Pressable
          style={styles.button}
          onPress={receiveMaterial}
        >
          <Text
            style={styles.buttonText}
          >
            RECEIVE
          </Text>
        </Pressable>

        {receiveMessage !== "" && (
          <View style={styles.successBox}>
            <Text
              style={
                styles.successText
              }
            >
              {receiveMessage}
            </Text>
          </View>
        )}

        <Pressable
          style={styles.back}
          onPress={() =>
            setScreen("menu")
          }
        >
          <Text>
            ← Back to Main Menu
          </Text>
        </Pressable>
      </ScrollView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#F4F7FB",
  },

  scroll: {
    flexGrow: 1,
    padding: 30,
    backgroundColor: "#F4F7FB",
  },

  menuScroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#F4F7FB",
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },

logo: {
  width: 240,
  height: 180,
  alignSelf: "center",
  marginBottom: 10,
},

title: {
    fontSize: 42,
    fontWeight: "800",
    textAlign: "center",
    color: "#0B1F3A",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 35,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    marginBottom: 15,
    color: "#0F172A",
  },

  button: {
    backgroundColor: "#0B5ED7",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },

 menuGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
},

menuIcon: {
  fontSize: 30,
  marginBottom: 8,
},


menuButton: {
  backgroundColor: "#0B5ED7",
  width: "48%",
  height: 120,
  borderRadius: 14,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 14,
  padding: 10,
  elevation: 3,
},

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },

  logout: {
    alignItems: "center",
    padding: 15,
    marginTop: 10,
  },

  logoutText: {
    color: "#cc0000",
    fontWeight: "bold",
  },

  back: {
    alignItems: "center",
    padding: 15,
    marginTop: 10,
  },

  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  quantity: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
  },

  demo: {
    textAlign: "center",
    color: "#777",
    marginTop: 15,
  },

  listItem: {
    fontSize: 16,
    marginBottom: 6,
  },

  successBox: {
    backgroundColor: "#d9f7df",
    borderWidth: 1,
    borderColor: "#4caf50",
    borderRadius: 8,
    padding: 18,
    marginTop: 5,
    marginBottom: 15,
  },

  successText: {
    color: "#176b25",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  messageBox: {
    backgroundColor: "#fff3cd",
    borderWidth: 1,
    borderColor: "#e0b000",
    borderRadius: 8,
    padding: 18,
    marginBottom: 15,
  },

  messageText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});