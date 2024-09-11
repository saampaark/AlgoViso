import React, { useState, useEffect } from 'react';
import './SortingVisualizer.css';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [selectedAlgo, setSelectedAlgo] = useState('');
  const [isSorting, setIsSorting] = useState(false); // Track sorting state

  // Generate a random array of size 'n'
  const generateArray = (n = 50) => {
    const arr = Array.from({ length: n }, () => Math.floor(Math.random() * 500));
    setArray(arr);
    setSelectedAlgo('');
    setIsSorting(false);
  };

  useEffect(() => {
    generateArray();
  }, []);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Bubble Sort Algorithm
  const bubbleSort = async () => {
    setSelectedAlgo('Bubble Sort');
    setIsSorting(true);
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await delay(50);
        }
      }
    }
    setIsSorting(false);
  };

  // Quick Sort Algorithm
  const quickSort = async () => {
    setSelectedAlgo('Quick Sort');
    setIsSorting(true);
    let arr = [...array];
    await quickSortHelper(arr, 0, arr.length - 1);
    setIsSorting(false);
  };

  const quickSortHelper = async (arr, low, high) => {
    if (low < high) {
      const pivotIdx = await partition(arr, low, high);
      await quickSortHelper(arr, low, pivotIdx - 1);
      await quickSortHelper(arr, pivotIdx + 1, high);
    }
  };

  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await delay(50);
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await delay(50);
    return i + 1;
  };

  // Merge Sort Algorithm
  const mergeSort = async () => {
    setSelectedAlgo('Merge Sort');
    setIsSorting(true);
    let arr = [...array];
    await mergeSortHelper(arr, 0, arr.length - 1);
    setIsSorting(false);
  };

  const mergeSortHelper = async (arr, left, right) => {
    if (left >= right) return;
    const middle = Math.floor((left + right) / 2);
    await mergeSortHelper(arr, left, middle);
    await mergeSortHelper(arr, middle + 1, right);
    await merge(arr, left, middle, right);
  };

  const merge = async (arr, left, middle, right) => {
    const leftArr = arr.slice(left, middle + 1);
    const rightArr = arr.slice(middle + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      setArray([...arr]);
      await delay(50);
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      setArray([...arr]);
      await delay(50);
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      setArray([...arr]);
      await delay(50);
      j++;
      k++;
    }
  };

  // Insertion Sort Algorithm
  const insertionSort = async () => {
    setSelectedAlgo('Insertion Sort');
    setIsSorting(true);
    let arr = [...array];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j = j - 1;
        setArray([...arr]);
        await delay(50);
      }
      arr[j + 1] = key;
      setArray([...arr]);
      await delay(50);
    }
    setIsSorting(false);
  };

  // Heap Sort Algorithm
  const heapSort = async () => {
    setSelectedAlgo('Heap Sort');
    setIsSorting(true);
    let arr = [...array];

    const heapify = async (arr, n, i) => {
      let largest = i;
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      if (left < n && arr[left] > arr[largest]) largest = left;
      if (right < n && arr[right] > arr[largest]) largest = right;
      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        setArray([...arr]);
        await delay(50);
        await heapify(arr, n, largest);
      }
    };

    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setArray([...arr]);
      await delay(50);
      await heapify(arr, i, 0);
    }
    setIsSorting(false);
  };

  // Render description based on selected algorithm
  const renderDescription = () => {
    switch (selectedAlgo) {
      case 'Bubble Sort':
        return (
          <div className="description show">
            <h2>Bubble Sort</h2>
            <p>Time Complexity: O(n²). This algorithm repeatedly swaps adjacent elements if they are in the wrong order.</p>
          </div>
        );
      case 'Merge Sort':
        return (
          <div className="description show">
            <h2>Merge Sort</h2>
            <p>Time Complexity: O(n log n). A divide-and-conquer algorithm that splits the array into halves, sorts each half, and merges them back together.</p>
          </div>
        );
      case 'Quick Sort':
        return (
          <div className="description show">
            <h2>Quick Sort</h2>
            <p>Time Complexity: O(n log n). This algorithm picks a pivot and partitions the array around the pivot so that elements on one side are smaller and the other side is larger.</p>
          </div>
        );
      case 'Insertion Sort':
        return (
          <div className="description show">
            <h2>Insertion Sort</h2>
            <p>Time Complexity: O(n²). This algorithm builds the final sorted array one item at a time, with each item being inserted into its correct position.</p>
          </div>
        );
      case 'Heap Sort':
        return (
          <div className="description show">
            <h2>Heap Sort</h2>
            <p>Time Complexity: O(n log n). This algorithm converts the array into a heap structure and then extracts elements from the heap one by one to build the sorted array.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="sorting-visualizer">
      <h1>AlgoViso ~ Sorting Algorithms</h1>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>
      <div className="controls">
        <button onClick={() => generateArray()} disabled={isSorting}>Generate New Array</button>
        <button onClick={bubbleSort} disabled={isSorting}>Bubble Sort</button>
        <button onClick={mergeSort} disabled={isSorting}>Merge Sort</button>
        <button onClick={quickSort} disabled={isSorting}>Quick Sort</button>
        <button onClick={insertionSort} disabled={isSorting}>Insertion Sort</button>
        <button onClick={heapSort} disabled={isSorting}>Heap Sort</button>
      </div>
      {renderDescription()}
    </div>
  );
};

export default SortingVisualizer;
