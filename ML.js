// machineLearning.js
import { RandomForestRegression as RFRegression } from 'ml-random-forest';

// One-hot encoding for categorical features
function oneHotEncode(data, column) {
  // Implement one-hot encoding logic here
  const uniqueValues = new Set(data.map(entry => entry[column]));

  // Create a mapping from each unique value to its corresponding one-hot encoding index
  const valueToIndex = {};
  let index = 0;
  uniqueValues.forEach(value => {
    valueToIndex[value] = index++;
  });

  // Generate one-hot encoded features
  const encodedFeatures = data.map(entry => {
    const encodedFeature = Array.from({ length: uniqueValues.size }, (_, i) => 0);
    encodedFeature[valueToIndex[entry[column]]] = 1;
    return encodedFeature;
  });

  return { encodedFeatures, valueToIndex };
}

// Mean Squared Error function
function meanSquaredError(actual, predicted) {
  // Implement mean squared error calculation here
  const sumSquaredErrors = actual.reduce((sum, val, i) => sum + Math.pow(val - predicted[i], 2), 0);
  return sumSquaredErrors / actual.length;
}

// Machine learning logic
function runMachineLearning(jsonData) {
    //const jsonData = readFileSync(filePath, 'utf8');  
    const data = Object.values(jsonData);

  // Extract features and target
    const targetColumn = 'Number_of_Persons_Injured'; // Adjust the target column name
    const features = data.map(record => {
        delete record[targetColumn];
        return Object.values(record); // Convert each object to an array
    });

    const labels = data.map(record => parseFloat(record[targetColumn]));

    // if (!features || !labels || features.length !== labels.length || features.length === 0) {
    //     console.error('Invalid features or labels.');
    //     process.exit(1); // Exit the process if there's an issue
    //   }

  // Handle categorical features by one-hot encoding
//     const { encodedFeatures, valueToIndex } = oneHotEncode(data, 'On_Street_Name'); // Adjust the categorical column name

//   // Add the one-hot encoded features to your dataset
//     const extendedFeatures = features.map((feature, i) => {
//         return feature.concat(encodedFeatures[i]);
//     });

    const encodedFeatures = features.map(record => {
    // Implement one-hot encoding logic here for categorical features
    // For simplicity, assuming all properties are numeric for this example
        return record.map(value => parseFloat(value));
    });

    const trainingSet = encodedFeatures.map(feature => feature.slice(0, -1));
    const predictions = labels;

    // Split the dataset into training and testing sets
    // const splitIndex = Math.floor(data.length * 0.8);
    // const X_train = encodedFeatures.slice(0, splitIndex);
    // const X_test = encodedFeatures.slice(splitIndex);
    // const y_train = labels.slice(0, splitIndex);
    // const y_test = labels.slice(splitIndex);

    const options = {
        seed: 3,
        maxFeatures: 2,
        replacement: false,
        nEstimators: 200
    };

    // Initialize the Random Forest model
    const model = new RFRegression(options);

    // Train the model
    //model.train(X_train, y_train);
    model.train(trainingSet, predictions);

    // Make predictions on the test set
    //const predictions2 = model.predict(X_test);
    const result = model.predict(trainingSet);

    // Evaluate the model
    //const mse = meanSquaredError(y_test, predictions2);
    console.log(result);
    //console.log(`Mean Squared Error: ${mse}`);
}

export default runMachineLearning;
