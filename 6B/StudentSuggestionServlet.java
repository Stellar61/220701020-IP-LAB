import java.io.IOException;
import java.io.PrintWriter;
import jakarta.
        servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/StudentSuggestionServlet")
public class StudentSuggestionServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    // Example array of student names
    private String[] studentNames = {
        "Alice", "Bob", "Charlie", "David", "Edward", "Frank", 
        "George", "Henry", "Isabella", "Jack", "Kelly", "Lily"
    };
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String query = request.getParameter("query").toLowerCase();
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        
        if (query != null && !query.trim().isEmpty()) {
            for (String student : studentNames) {
                if (student.toLowerCase().startsWith(query)) {
                    out.println("<p>" + student + "</p>");
                }
            }
        }
    }
}
