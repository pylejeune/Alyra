pragma solidity ^0.5.7;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Credibilite {
  
   using SafeMath for uint256;
  
   mapping (address => uint256) public cred;
   bytes32[] private devoirs;
   
   function produireHash(string memory url) public returns (bytes32){
       bytes32 condensat = keccak256(bytes(url));
       devoirs.push(condensat);
       addCred(condensat);
       return condensat;
   }

    function transfert(address payable destinataire, uint256 valeur) public {
        require(cred[msg.sender]>valeur, "tu n'as pas assez de cred");
        require(cred[msg.sender]>1, "Tu dois avoir au mloins 1 cred");
        destinataire.transfer(valeur);
    }
    
    function remettre(bytes32 devoir) public view returns (uint256) {
        for(uint256 i=0;i<devoirs.length;i++){
            if(devoirs[i] == devoir){
                return i+1;
            }
        }
        
        return 0;
    }
    
    function addCred(bytes32 condansat) private {
        if(remettre(condansat) == 1){
            cred[msg.sender] = 30;
        }else if(remettre(condansat) == 2){
            cred[msg.sender] = 20;
        }else{
            cred[msg.sender] = 10;
        }
    }

    
    function listHash() public view returns (bytes32[] memory){
       return devoirs;
    }
}