import models.Node;

import java.util.List;

public interface RuleGenerator {

    void setNodes(List<Node> nodes);
    String generate();


}

