let myArray = [
  {
      "nodeId": "4",
      "name": "Four",
      "parentId": "2",
      "previousSiblingId": "6"
    },
    {
      "nodeId": "8",
      "name": "Eight",
      "parentId": "7",
      "previousSiblingId": null
    },
    {
      "nodeId": "2",
      "name": "Two",
      "parentId": "1",
      "previousSiblingId": null
    },
    {
      "nodeId": "6",
      "name": "Six",
      "parentId": "2",
      "previousSiblingId": null
    },
    {
      "nodeId": "3",
      "name": "Three",
      "parentId": null,
      "previousSiblingId": null
    },
    {
      "nodeId": "5",
      "name": "Five",
      "parentId": "4",
      "previousSiblingId": null
    },
    {
      "nodeId": "7",
      "name": "Seven",
      "parentId": null,
      "previousSiblingId": "1"
    },
    {
      "nodeId": "1",
      "name": "One",
      "parentId": null,
      "previousSiblingId": "3"
    }
]

const SortNodes = (_arr = [], root = null) => {
  // Create a new array where the result will be stored
  let result = new Array();
  const obj = Object.create(null);
  // Loop through each object in the array
  _arr.forEach(node => {
    node.children = obj[node.nodeId] && obj[node.nodeId].children;
    // Map each id to their nodes
    obj[node.nodeId] = node;
  
    // if parent is null, push the node into the new result array created
    if(node.parentId === root){ 
      result.push(node);
    }
    // else add such node as a child to a particular parent id
    else{
      obj[node.parentId] = obj[node.parentId] || {};
      obj[node.parentId].children = obj[node.parentId].children || [];
      obj[node.parentId].children.push(node);
    }
  }); 
  
  
  // Create a new variable of the resultant array
  let myarr = result; 
  // Function that sorts nodes by previousSiblingId
const sortBySibling = (_arr) => {
  // helper function to swap
  const swapElements = (_arr, index1, index2) => {
    let temp = _arr[index1];
    _arr[index1] = _arr[index2];
    _arr[index2] = temp;
  };

  // helper function to swap elements in correct order
  const compareAndSwap = (_arr, i, n, expected) => {
    if (_arr[i].previousSiblingId !== expected) {
      for (let j = 0; j < n; j++) {
        if (_arr[j].previousSiblingId === expected) {
          // swap arr[i] and arr[j]
          swapElements(_arr, i, j);
        }
      }
    }
  };

  const n = _arr.length;
  for (let i = 0; i < n; i++) {
    if (i === 0) {
      // previousSiblingId should be null, else we find correct node and place
      compareAndSwap(_arr, i, n, null);
    } else {
      // previousSiblingId should be arr[i-1]["nodeId"], else we find correct node and place
      compareAndSwap(_arr, i, n, _arr[i - 1].nodeId);
    }

  }
  return _arr;

}

return sortBySibling(myarr);
  }



console.log(JSON.stringify(SortNodes(myArray) , undefined, 4));

