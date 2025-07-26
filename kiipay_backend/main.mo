import Debug "mo:base/Debug";

actor KiipayBackend {
  stable var greeting : Text = "Hello, ";

  public func setGreeting(prefix : Text) : async () {
    Debug.print("Setting new greeting: " # prefix);
    greeting := prefix;
  };

  public func saveTransaction(user : Text, amount : Nat) : async Text {
    Debug.print("Saving transaction for " # user # ": " # debug_show(amount));
    return "Transaction saved for " # user # " amount: " # debug_show(amount);
  };

  public query func greet(name : Text) : async Text {
    return greeting # name # "!";
  };

  public query func getVersion() : async Text {
    return "Kiipay ICP v0.1";
  };
};
